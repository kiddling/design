import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { mockCases } from "../shared/mock-data";
import type { Case, Discipline, Difficulty } from "../shared/types";

// Middleware
import { requestLogger } from "./middleware/logger";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { apiLimiter, submissionLimiter } from "./middleware/rateLimiter";

// Routers
import coursesRouter from "./routes/courses";
import knowledgeRouter from "./routes/knowledge";
import casesRouter from "./routes/cases";
import promptsRouter from "./routes/prompts";
import workflowsRouter from "./routes/workflows";
import resourcesRouter from "./routes/resources";
import assignmentsRouter from "./routes/assignments";
import usersRouter from "./routes/users";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT =
  process.env.PORT || (process.env.NODE_ENV === "production" ? 3000 : 3001);

app.use(express.json());

const favorites = new Set<string>();

app.get("/api/cases", (req, res) => {
  try {
    const {
      search,
      disciplines,
      tags,
      difficulty,
      favorites: showFavorites,
    } = req.query;

    let filteredCases = mockCases.map(c => ({
      ...c,
      isFavorite: favorites.has(c.id),
    }));

    if (search) {
      const searchLower = String(search).toLowerCase();
      filteredCases = filteredCases.filter(
        c =>
          c.title.toLowerCase().includes(searchLower) ||
          c.keyInsight.toLowerCase().includes(searchLower) ||
          c.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          c.problem.toLowerCase().includes(searchLower) ||
          c.solution.toLowerCase().includes(searchLower)
      );
    }

    if (disciplines) {
      const disciplineList = String(disciplines).split(",") as Discipline[];
      filteredCases = filteredCases.filter(c =>
        disciplineList.includes(c.discipline)
      );
    }

    if (tags) {
      const tagList = String(tags).split(",");
      filteredCases = filteredCases.filter(c =>
        tagList.some(tag => c.tags.includes(tag))
      );
    }

    if (difficulty) {
      const difficultyList = String(difficulty).split(",") as Difficulty[];
      filteredCases = filteredCases.filter(c =>
        difficultyList.includes(c.difficulty)
      );
    }

    if (showFavorites === "true") {
      filteredCases = filteredCases.filter(c => c.isFavorite);
    }

    res.json(filteredCases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ error: "Failed to fetch cases" });
  }
});

app.post("/api/cases/:id/favorite", (req, res) => {
  try {
    const { id } = req.params;
    const caseItem = mockCases.find(c => c.id === id);

    if (!caseItem) {
      return res.status(404).json({ error: "Case not found" });
    }

    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
      favorites.add(id);
    }

    res.json({
      id,
      isFavorite: favorites.has(id),
      message: favorites.has(id)
        ? "Added to favorites"
        : "Removed from favorites",
    });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res.status(500).json({ error: "Failed to toggle favorite" });
  }
});

app.get("/api/workflow/steps", (_req, res) => {
  res.json(workflowSteps);
});

app.get("/api/workflow/jan-gehl", (_req, res) => {
  res.json(janGehlStages);
});

app.get("/api/workflow/tools", (_req, res) => {
  res.json(toolRecommendations);
});

app.get("/api/workflow/templates", (_req, res) => {
  res.json(downloadableTemplates);
});

app.get("/api/workflow/progress", (req, res) => {
  const userId = req.headers["x-user-id"] as string || "default-user";
  const progress = workflowProgressStore.get(userId);
  
  if (!progress) {
    const defaultProgress: WorkflowProgress = {
      userId,
      completedSteps: [],
      checklistProgress: {},
      usedTools: [],
      downloadedTemplates: [],
      notes: {},
      lastUpdated: new Date().toISOString(),
      overallProgress: 0,
    };
    return res.json(defaultProgress);
  }
  
  res.json(progress);
});

app.post("/api/workflow/progress", (req, res) => {
  const userId = req.headers["x-user-id"] as string || "default-user";
  const {
    completedSteps,
    checklistProgress,
    usedTools,
    downloadedTemplates,
    notes,
  } = req.body;
  
  const totalSteps = workflowSteps.length;
  const totalChecklists = workflowSteps.reduce(
    (sum, step) => sum + step.checklist.length,
    0
  );
  const completedChecklists = Object.values(checklistProgress || {}).reduce(
    (sum: number, items) => sum + (items as string[]).length,
    0
  );
  
  const stepProgress = (completedSteps?.length || 0) / totalSteps;
  const checklistProgressValue = completedChecklists / totalChecklists;
  const toolProgress = (usedTools?.length || 0) / toolRecommendations.length;
  
  const overallProgress = Math.round(
    (stepProgress * 0.4 + checklistProgressValue * 0.4 + toolProgress * 0.2) * 100
  );
  
  const progress: WorkflowProgress = {
    userId,
    completedSteps: completedSteps || [],
    checklistProgress: checklistProgress || {},
    usedTools: usedTools || [],
    downloadedTemplates: downloadedTemplates || [],
    notes: notes || {},
    lastUpdated: new Date().toISOString(),
    overallProgress,
  };
  
  workflowProgressStore.set(userId, progress);
  res.json(progress);
});

app.post("/api/workflow/tools/:toolId/use", (req, res) => {
  const userId = req.headers["x-user-id"] as string || "default-user";
  const { toolId } = req.params;
  
  const progress = workflowProgressStore.get(userId) || {
    userId,
    completedSteps: [],
    checklistProgress: {},
    usedTools: [],
    downloadedTemplates: [],
    notes: {},
    lastUpdated: new Date().toISOString(),
    overallProgress: 0,
  };
  
  if (!progress.usedTools.includes(toolId)) {
    progress.usedTools.push(toolId);
    progress.lastUpdated = new Date().toISOString();
    workflowProgressStore.set(userId, progress);
  }
  
  res.json(progress);
});

app.post("/api/workflow/templates/:templateId/download", (req, res) => {
  const userId = req.headers["x-user-id"] as string || "default-user";
  const { templateId } = req.params;
  
  const template = getTemplateById(templateId);
  if (!template) {
    return res.status(404).json({ error: "Template not found" });
  }
  
  template.downloadCount++;
  
  const progress = workflowProgressStore.get(userId) || {
    userId,
    completedSteps: [],
    checklistProgress: {},
    usedTools: [],
    downloadedTemplates: [],
    notes: {},
    lastUpdated: new Date().toISOString(),
    overallProgress: 0,
  };
  
  if (!progress.downloadedTemplates.includes(templateId)) {
    progress.downloadedTemplates.push(templateId);
    progress.lastUpdated = new Date().toISOString();
    workflowProgressStore.set(userId, progress);
  }
  
  res.json({ template, progress });
});

app.post("/api/workflow/notes", (req, res) => {
  const userId = req.headers["x-user-id"] as string || "default-user";
  const { stageId, note } = req.body;
  
  const progress = workflowProgressStore.get(userId) || {
    userId,
    completedSteps: [],
    checklistProgress: {},
    usedTools: [],
    downloadedTemplates: [],
    notes: {},
    lastUpdated: new Date().toISOString(),
    overallProgress: 0,
  };
  
  progress.notes[stageId] = note;
  progress.lastUpdated = new Date().toISOString();
  workflowProgressStore.set(userId, progress);
  
  res.json(progress);
});

if (process.env.NODE_ENV === "production") {
  const publicPath = path.join(__dirname, "public");
  app.use(express.static(publicPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

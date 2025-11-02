import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { courses, getCourseById } from "../shared/data/courses.js";
import type { UserProgress } from "../shared/types/course.js";
import {
  workflowSteps,
  janGehlStages,
  toolRecommendations,
  downloadableTemplates,
  getTemplateById,
} from "../shared/data/workflow.js";
import type { WorkflowProgress } from "../shared/types/workflow.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const userProgressStore: Map<string, UserProgress> = new Map();
const workflowProgressStore: Map<string, WorkflowProgress> = new Map();

app.get("/api/courses", (_req, res) => {
  res.json(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = getCourseById(req.params.id);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  res.json(course);
});

app.get("/api/courses/:courseId/progress", (req, res) => {
  const { courseId } = req.params;
  const userId = req.headers["x-user-id"] as string || "default-user";
  
  const progressKey = `${userId}-${courseId}`;
  const progress = userProgressStore.get(progressKey);
  
  if (!progress) {
    const defaultProgress: UserProgress = {
      userId,
      courseId,
      completedSections: [],
      lastAccessed: new Date().toISOString(),
      progressPercentage: 0,
    };
    return res.json(defaultProgress);
  }
  
  res.json(progress);
});

app.post("/api/courses/:courseId/progress", (req, res) => {
  const { courseId } = req.params;
  const userId = req.headers["x-user-id"] as string || "default-user";
  const { completedSections } = req.body;
  
  const course = getCourseById(courseId);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  
  const progressPercentage = Math.round(
    (completedSections.length / course.sections.length) * 100
  );
  
  const progress: UserProgress = {
    userId,
    courseId,
    completedSections,
    lastAccessed: new Date().toISOString(),
    progressPercentage,
  };
  
  const progressKey = `${userId}-${courseId}`;
  userProgressStore.set(progressKey, progress);
  
  res.json(progress);
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
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const publicPath = path.join(__dirname, "public");
  
  app.use(express.static(publicPath));
  
  app.get("*", (_req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

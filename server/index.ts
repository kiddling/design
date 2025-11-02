import express, { type Request, type Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import {
  assignmentDefaults,
  caseStudies,
  courseDetails,
  courses,
  knowledgeCards,
  promptTemplates,
} from "../shared/data";
import type { AssignmentFormSchema } from "../shared/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const assignmentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  projectUrl: z.string().url(),
  notes: z.string().optional().or(z.literal("")),
});

const submissions: AssignmentFormSchema[] = [];

app.get("/api/courses", (req: Request, res: Response) => {
  res.json(courses);
});

app.get("/api/courses/:id", (req: Request, res: Response) => {
  const detail = courseDetails[req.params.id];

  if (!detail) {
    return res.status(404).json({ error: "Course not found" });
  }

  res.json(detail);
});

app.get("/api/knowledge", (_req: Request, res: Response) => {
  res.json(knowledgeCards);
});

app.get("/api/cases", (req: Request, res: Response) => {
  const { discipline, difficulty, search } = req.query;
  const normalizedSearch = typeof search === "string" ? search.trim().toLowerCase() : "";

  const filtered = caseStudies.filter((caseStudy) => {
    const matchesDiscipline =
      typeof discipline !== "string" || discipline === "all"
        ? true
        : caseStudy.discipline === discipline;

    const matchesDifficulty =
      typeof difficulty !== "string" || difficulty === "all"
        ? true
        : caseStudy.difficulty === difficulty;

    const matchesSearch =
      normalizedSearch.length === 0 ||
      caseStudy.title.toLowerCase().includes(normalizedSearch);

    return matchesDiscipline && matchesDifficulty && matchesSearch;
  });

  res.json(filtered);
});

app.get("/api/prompts", (_req: Request, res: Response) => {
  res.json(promptTemplates);
});

app.post("/api/assignments", (req: Request, res: Response) => {
  const parsed = assignmentSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const submission = {
    ...assignmentDefaults,
    ...parsed.data,
  };

  submissions.push(submission);

  res.status(201).json({ message: "Assignment received" });
});

app.post("/api/analytics/vitals", (req: Request, res: Response) => {
  console.log("[Web Vitals]", req.body);
  res.status(200).end();
});

app.post("/api/analytics/pageview", (req: Request, res: Response) => {
  console.log("[Page View]", req.body);
  res.status(200).end();
});

app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;

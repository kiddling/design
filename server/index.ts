import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { courses, getCourseById } from "../shared/data/courses.js";
import type { UserProgress } from "../shared/types/course.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const userProgressStore: Map<string, UserProgress> = new Map();

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

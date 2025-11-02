import express, { type Request, type Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CourseOutlineItem, CourseDetail } from "../shared/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const mockCourses: CourseOutlineItem[] = [
  {
    id: "1",
    title: "观·元素解构",
    description: "点线面基础理论",
    week: 1,
  },
  {
    id: "2",
    title: "触·材质发现",
    description: "材质摄影与分类",
    week: 2,
  },
];

const mockCourseDetails: Record<string, CourseDetail> = {
  "1": {
    id: "1",
    title: "观·元素解构",
    description: "点线面基础理论",
    week: 1,
    objectives: ["Learn fundamental elements", "Analyze compositions"],
    resources: ["Canva tutorial", "Point-Line-Plane theory"],
    image: "/assets/course-1.jpg",
  },
};

app.get("/api/courses", (req: Request, res: Response) => {
  res.json(mockCourses);
});

app.get("/api/courses/:id", (req: Request, res: Response) => {
  const detail = mockCourseDetails[req.params.id];
  if (!detail) {
    return res.status(404).json({ error: "Course not found" });
  }
  res.json(detail);
});

app.post("/api/analytics/vitals", (req: Request, res: Response) => {
  console.log("[Web Vitals]", req.body);
  res.status(200).end();
});

app.post("/api/analytics/pageview", (req: Request, res: Response) => {
  console.log("[Page View]", req.body);
  res.status(200).end();
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;

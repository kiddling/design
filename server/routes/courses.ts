import { Router } from "express";
import { courses } from "@shared/data/courses";
import type { Course, ApiResponse } from "@shared/types";

const router = Router();

router.get("/", (_req, res) => {
  const response: ApiResponse<Course[]> = {
    success: true,
    data: courses,
  };
  res.json(response);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const course = courses.find(c => c.id === id);

  if (!course) {
    const response: ApiResponse<never> = {
      success: false,
      error: "Course not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Course> = {
    success: true,
    data: course,
  };
  res.json(response);
});

export default router;

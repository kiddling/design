import type { VercelRequest, VercelResponse } from "@vercel/node";
import { courses, getCourseById } from "../shared/data/courses.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { id } = req.query;

    if (id && typeof id === "string") {
      const course = getCourseById(id);
      if (!course) {
        return res.status(404).json({
          success: false,
          error: "Course not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: course,
      });
    }

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { assignments } from "../shared/data/assignments.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { id, lessonId } = req.query;

    if (id && typeof id === "string") {
      const assignment = assignments.find((a) => a.id === id);
      if (!assignment) {
        return res.status(404).json({
          success: false,
          error: "Assignment not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: assignment,
      });
    }

    if (lessonId && typeof lessonId === "string") {
      const filteredAssignments = assignments.filter((a) => a.lessonId === lessonId);
      return res.status(200).json({
        success: true,
        data: filteredAssignments,
      });
    }

    return res.status(200).json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

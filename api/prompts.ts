import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prompts } from "../shared/data/prompts.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const {
      id,
      category,
      difficulty,
      tags,
      search,
      courseSection,
      courseId,
      limit = "10",
      page = "1",
      pageSize = "10",
    } = req.query;

    if (id && typeof id === "string") {
      const prompt = prompts.find((p) => p.id === id);
      if (!prompt) {
        return res.status(404).json({
          success: false,
          error: "Prompt not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: prompt,
      });
    }

    let filtered = [...prompts];

    if (category && typeof category === "string") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (difficulty && typeof difficulty === "string") {
      filtered = filtered.filter((p) => p.difficulty === difficulty);
    }

    if (tags && typeof tags === "string") {
      const tagList = tags.split(",").map((t) => t.trim());
      filtered = filtered.filter((p) => p.tags?.some((tag: string) => tagList.includes(tag)));
    }

    if (search && typeof search === "string") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
      );
    }

    if (courseSection && typeof courseSection === "string") {
      filtered = filtered.filter(
        (p) => p.courseSection && p.courseSection.includes(courseSection)
      );
    }

    if (courseId && typeof courseId === "string") {
      filtered = filtered.filter(
        (p) => p.relatedCourses && p.relatedCourses.includes(courseId)
      );
    }

    if (courseSection || courseId) {
      const limitNum = parseInt(limit as string, 10);
      return res.status(200).json({
        success: true,
        data: {
          prompts: filtered.slice(0, limitNum),
          reason: courseSection
            ? `Recommendations based on course section: ${courseSection}`
            : `Recommendations based on course: ${courseId}`,
          relatedCourseSection: courseSection,
        },
      });
    }

    const pageNum = parseInt(page as string, 10);
    const pageSizeNum = parseInt(pageSize as string, 10);
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSizeNum);
    const start = (pageNum - 1) * pageSizeNum;
    const end = start + pageSizeNum;
    const items = filtered.slice(start, end);

    return res.status(200).json({
      success: true,
      data: {
        items,
        total,
        page: pageNum,
        pageSize: pageSizeNum,
        totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

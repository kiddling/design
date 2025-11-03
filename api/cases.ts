import type { VercelRequest, VercelResponse } from "@vercel/node";
import { caseStudies } from "../shared/data/case-studies.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { id, category, difficulty, tags, search, page = "1", pageSize = "10" } = req.query;

    if (id && typeof id === "string") {
      const caseStudy = caseStudies.find((c) => c.id === id);
      if (!caseStudy) {
        return res.status(404).json({
          success: false,
          error: "Case study not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: caseStudy,
      });
    }

    let filtered = [...caseStudies];

    if (category && typeof category === "string") {
      filtered = filtered.filter((c) => c.discipline === category);
    }

    if (difficulty && typeof difficulty === "string") {
      filtered = filtered.filter((c) => c.difficulty === difficulty);
    }

    if (tags && typeof tags === "string") {
      const tagList = tags.split(",").map((t) => t.trim());
      filtered = filtered.filter((c) => c.tags?.some((tag) => tagList.includes(tag)));
    }

    if (search && typeof search === "string") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower)
      );
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

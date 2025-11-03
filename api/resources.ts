import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resources, books as booksData } from "../shared/data/resources.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const {
      id,
      category,
      difficulty,
      type,
      isPremium,
      tags,
      search,
      page = "1",
      pageSize = "10",
      books,
    } = req.query;

    if (books === "true") {
      if (id && typeof id === "string") {
        const book = booksData.find((b) => b.id === id);
        if (!book) {
          return res.status(404).json({
            success: false,
            error: "Book not found",
          });
        }
        return res.status(200).json({
          success: true,
          data: book,
        });
      }

      return res.status(200).json({
        success: true,
        data: booksData,
      });
    }

    if (id && typeof id === "string") {
      const resource = resources.find((r) => r.id === id);
      if (!resource) {
        return res.status(404).json({
          success: false,
          error: "Resource not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: resource,
      });
    }

    let filtered = [...resources];

    if (difficulty && typeof difficulty === "string") {
      filtered = filtered.filter((r) => r.difficulty === difficulty);
    }

    if (type && typeof type === "string") {
      filtered = filtered.filter((r) => r.type === type);
    }

    if (isPremium === "true") {
      filtered = filtered.filter((r) => r.isPremium === true);
    } else if (isPremium === "false") {
      filtered = filtered.filter((r) => r.isPremium === false);
    }

    if (tags && typeof tags === "string") {
      const tagList = tags.split(",").map((t) => t.trim());
      filtered = filtered.filter((r) => r.tags?.some((tag) => tagList.includes(tag)));
    }

    if (search && typeof search === "string") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(searchLower) ||
          r.description?.toLowerCase().includes(searchLower)
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

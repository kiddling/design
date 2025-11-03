import { Router } from "express";
import { cases } from "@shared/data/cases";
import { filterSchema, paginationSchema } from "@shared/schemas";
import type { Case, ApiResponse, PaginatedResponse } from "@shared/types";

const router = Router();

router.get("/", (req, res) => {
  try {
    const filters = filterSchema.parse(req.query);
    const pagination = paginationSchema.parse(req.query);

    let filtered = [...cases];

    if (filters.category) {
      filtered = filtered.filter(c => c.category === filters.category);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(c => c.difficulty === filters.difficulty);
    }

    if (filters.tags) {
      const tags = filters.tags.split(",").map(t => t.trim());
      filtered = filtered.filter(c => c.tags.some(tag => tags.includes(tag)));
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        c =>
          c.title.toLowerCase().includes(search) ||
          c.description.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pagination.pageSize);
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    const items = filtered.slice(start, end);

    const response: ApiResponse<PaginatedResponse<Case>> = {
      success: true,
      data: {
        items,
        total,
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalPages,
      },
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Invalid query parameters",
    };
    res.status(400).json(response);
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const caseItem = cases.find(c => c.id === id);

  if (!caseItem) {
    const response: ApiResponse<never> = {
      success: false,
      error: "Case not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Case> = {
    success: true,
    data: caseItem,
  };
  res.json(response);
});

export default router;

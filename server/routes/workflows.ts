import { Router } from "express";
import { workflows } from "@shared/data/workflows";
import { filterSchema, paginationSchema } from "@shared/schemas";
import type { Workflow, ApiResponse, PaginatedResponse } from "@shared/types";

const router = Router();

router.get("/", (req, res) => {
  try {
    const filters = filterSchema.parse(req.query);
    const pagination = paginationSchema.parse(req.query);

    let filtered = [...workflows];

    if (filters.category) {
      filtered = filtered.filter(w => w.category === filters.category);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(w => w.difficulty === filters.difficulty);
    }

    if (filters.tags) {
      const tags = filters.tags.split(",").map(t => t.trim());
      filtered = filtered.filter(w => w.tags.some(tag => tags.includes(tag)));
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        w =>
          w.title.toLowerCase().includes(search) ||
          w.description.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pagination.pageSize);
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    const items = filtered.slice(start, end);

    const response: ApiResponse<PaginatedResponse<Workflow>> = {
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
  const workflow = workflows.find(w => w.id === id);

  if (!workflow) {
    const response: ApiResponse<never> = {
      success: false,
      error: "Workflow not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Workflow> = {
    success: true,
    data: workflow,
  };
  res.json(response);
});

export default router;

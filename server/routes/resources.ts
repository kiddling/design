import { Router } from "express";
import { resources } from "@shared/data/resources";
import { filterSchema, paginationSchema } from "@shared/schemas";
import type { Resource, ApiResponse, PaginatedResponse } from "@shared/types";
import { z } from "zod";

const router = Router();

const resourceFilterSchema = filterSchema.extend({
  type: z
    .enum(["tool", "article", "video", "book", "website", "course"])
    .optional(),
  isPremium: z
    .string()
    .transform(val => val === "true")
    .optional(),
});

router.get("/", (req, res) => {
  try {
    const filters = resourceFilterSchema.parse(req.query);
    const pagination = paginationSchema.parse(req.query);

    let filtered = [...resources];

    if (filters.category) {
      filtered = filtered.filter(r => r.category === filters.category);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(r => r.difficulty === filters.difficulty);
    }

    if (filters.type) {
      filtered = filtered.filter(r => r.type === filters.type);
    }

    if (filters.isPremium !== undefined) {
      filtered = filtered.filter(r => r.isPremium === filters.isPremium);
    }

    if (filters.tags) {
      const tags = filters.tags.split(",").map(t => t.trim());
      filtered = filtered.filter(r => r.tags.some(tag => tags.includes(tag)));
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        r =>
          r.title.toLowerCase().includes(search) ||
          r.description.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pagination.pageSize);
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    const items = filtered.slice(start, end);

    const response: ApiResponse<PaginatedResponse<Resource>> = {
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
  const resource = resources.find(r => r.id === id);

  if (!resource) {
    const response: ApiResponse<never> = {
      success: false,
      error: "Resource not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Resource> = {
    success: true,
    data: resource,
  };
  res.json(response);
});

export default router;

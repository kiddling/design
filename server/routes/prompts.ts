import { Router } from "express";
import { prompts } from "@shared/data/prompts";
import {
  filterSchema,
  paginationSchema,
  recommendationQuerySchema,
} from "@shared/schemas";
import type {
  Prompt,
  ApiResponse,
  PaginatedResponse,
  RecommendationResponse,
} from "@shared/types";

const router = Router();

router.get("/", (req, res) => {
  try {
    const filters = filterSchema.parse(req.query);
    const pagination = paginationSchema.parse(req.query);

    let filtered = [...prompts];

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(p => p.difficulty === filters.difficulty);
    }

    if (filters.tags) {
      const tags = filters.tags.split(",").map(t => t.trim());
      filtered = filtered.filter(p => p.tags.some(tag => tags.includes(tag)));
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pagination.pageSize);
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    const items = filtered.slice(start, end);

    const response: ApiResponse<PaginatedResponse<Prompt>> = {
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

router.get("/recommendations", (req, res) => {
  try {
    const query = recommendationQuerySchema.parse(req.query);

    let recommended = [...prompts];

    // Filter by course section for context-aware recommendations
    if (query.courseSection) {
      recommended = recommended.filter(
        p => p.courseSection && p.courseSection.includes(query.courseSection!)
      );
    }

    // Filter by course ID via relatedCourses
    if (query.courseId) {
      recommended = recommended.filter(
        p => p.relatedCourses && p.relatedCourses.includes(query.courseId!)
      );
    }

    // Filter by difficulty
    if (query.difficulty) {
      recommended = recommended.filter(p => p.difficulty === query.difficulty);
    }

    // Limit results
    recommended = recommended.slice(0, query.limit);

    const response: ApiResponse<RecommendationResponse> = {
      success: true,
      data: {
        prompts: recommended,
        reason: query.courseSection
          ? `Recommendations based on course section: ${query.courseSection}`
          : query.courseId
            ? `Recommendations based on course: ${query.courseId}`
            : "General recommendations",
        relatedCourseSection: query.courseSection,
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
  const prompt = prompts.find(p => p.id === id);

  if (!prompt) {
    const response: ApiResponse<never> = {
      success: false,
      error: "Prompt not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Prompt> = {
    success: true,
    data: prompt,
  };
  res.json(response);
});

export default router;

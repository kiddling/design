import { Router } from "express";
import { knowledgeCards } from "@shared/data/knowledge";
import { filterSchema, paginationSchema } from "@shared/schemas";
import type {
  KnowledgeCard,
  ApiResponse,
  PaginatedResponse,
} from "@shared/types";

const router = Router();

router.get("/", (req, res) => {
  try {
    const filters = filterSchema.parse(req.query);
    const pagination = paginationSchema.parse(req.query);

    let filtered = [...knowledgeCards];

    if (filters.category) {
      filtered = filtered.filter(card => card.category === filters.category);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(
        card => card.difficulty === filters.difficulty
      );
    }

    if (filters.tags) {
      const tags = filters.tags.split(",").map(t => t.trim());
      filtered = filtered.filter(card =>
        card.tags?.some(tag => tags.includes(tag))
      );
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        card =>
          card.title.toLowerCase().includes(search) ||
          card.description.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pagination.pageSize);
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    const items = filtered.slice(start, end);

    const response: ApiResponse<PaginatedResponse<KnowledgeCard>> = {
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
  const card = knowledgeCards.find(c => c.id === id);

  if (!card) {
    const response: ApiResponse<never> = {
      success: false,
      error: "Knowledge card not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<KnowledgeCard> = {
    success: true,
    data: card,
  };
  res.json(response);
});

export default router;

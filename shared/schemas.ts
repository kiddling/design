import { z } from "zod";

// User Progress Schema
export const userProgressSchema = z.object({
  userId: z.string().min(1),
  courseId: z.string().min(1),
  completedSections: z.array(z.string()),
  currentSection: z.string().optional(),
  lastAccessed: z.string().datetime(),
  progressPercentage: z.number().min(0).max(100),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
});

export const updateProgressSchema = z.object({
  courseId: z.string().min(1),
  completedSections: z.array(z.string()).optional(),
  currentSection: z.string().optional(),
  progressPercentage: z.number().min(0).max(100).optional(),
});

// User Favorite Schema
export const userFavoriteSchema = z.object({
  id: z.string(),
  userId: z.string().min(1),
  itemId: z.string().min(1),
  itemType: z.enum([
    "course",
    "knowledge",
    "case",
    "prompt",
    "workflow",
    "resource",
  ]),
  createdAt: z.string().datetime(),
});

export const addFavoriteSchema = z.object({
  itemId: z.string().min(1),
  itemType: z.enum([
    "course",
    "knowledge",
    "case",
    "prompt",
    "workflow",
    "resource",
  ]),
});

// Assignment Submission Schema
export const submissionFieldSchema = z.object({
  requirementId: z.string().min(1),
  value: z.string(),
});

export const submissionFileSchema = z.object({
  requirementId: z.string().min(1),
  filename: z.string(),
  originalName: z.string(),
  mimetype: z.string(),
  size: z.number(),
  path: z.string(),
  uploadedAt: z.string().datetime(),
});

export const assignmentSubmissionSchema = z.object({
  assignmentId: z.string().min(1),
  userId: z.string().min(1),
  status: z.enum(["draft", "submitted", "graded"]),
  submittedAt: z.string().datetime().optional(),
  fields: z.array(submissionFieldSchema),
  files: z.array(submissionFileSchema).optional(),
  score: z.number().optional(),
  feedback: z.string().optional(),
});

export const createSubmissionSchema = z.object({
  assignmentId: z.string().min(1),
  status: z.enum(["draft", "submitted"]).default("draft"),
  fields: z.array(submissionFieldSchema),
});

export const updateSubmissionSchema = z.object({
  status: z.enum(["draft", "submitted"]).optional(),
  fields: z.array(submissionFieldSchema).optional(),
  score: z.number().optional(),
  feedback: z.string().optional(),
});

// Query parameter schemas
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

export const filterSchema = z.object({
  category: z.string().optional(),
  difficulty: z.enum(["base", "advance", "stretch"]).optional(),
  tags: z.string().optional(), // Comma-separated
  search: z.string().optional(),
});

export const recommendationQuerySchema = z.object({
  courseSection: z.string().optional(),
  courseId: z.string().optional(),
  difficulty: z.enum(["base", "advance", "stretch"]).optional(),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

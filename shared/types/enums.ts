import { z } from "zod";

export const DifficultyLevel = {
  BASE: "base",
  ADVANCE: "advance",
  STRETCH: "stretch",
} as const;

export const DifficultyLevelSchema = z.enum(["base", "advance", "stretch"]);
export type DifficultyLevel = z.infer<typeof DifficultyLevelSchema>;

export const Discipline = {
  GRAPHIC_DESIGN: "graphic_design",
  INDUSTRIAL_DESIGN: "industrial_design",
  FASHION_DESIGN: "fashion_design",
  ARCHITECTURE: "architecture",
  INTERACTION_DESIGN: "interaction_design",
  GENERAL: "general",
} as const;

export const DisciplineSchema = z.enum([
  "graphic_design",
  "industrial_design",
  "fashion_design",
  "architecture",
  "interaction_design",
  "general",
]);
export type Discipline = z.infer<typeof DisciplineSchema>;

export const CompositionType = {
  PLANAR: "planar",
  COLOR: "color",
  SPATIAL: "spatial",
} as const;

export const CompositionTypeSchema = z.enum(["planar", "color", "spatial"]);
export type CompositionType = z.infer<typeof CompositionTypeSchema>;

export const LearningState = {
  NOT_STARTED: "not_started",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  REVIEWED: "reviewed",
} as const;

export const LearningStateSchema = z.enum([
  "not_started",
  "in_progress",
  "completed",
  "reviewed",
]);
export type LearningState = z.infer<typeof LearningStateSchema>;

export const AITool = {
  MIDJOURNEY: "midjourney",
  STABLE_DIFFUSION: "stable_diffusion",
  DALLE: "dalle",
  CHINESE_AI: "chinese_ai",
  GENERAL: "general",
} as const;

export const AIToolSchema = z.enum([
  "midjourney",
  "stable_diffusion",
  "dalle",
  "chinese_ai",
  "general",
]);
export type AITool = z.infer<typeof AIToolSchema>;

export const ResourceType = {
  TOOL: "tool",
  TUTORIAL: "tutorial",
  ARTICLE: "article",
  VIDEO: "video",
  BOOK: "book",
  WEBSITE: "website",
} as const;

export const ResourceTypeSchema = z.enum([
  "tool",
  "tutorial",
  "article",
  "video",
  "book",
  "website",
]);
export type ResourceType = z.infer<typeof ResourceTypeSchema>;

export const SubmissionStatus = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  NEEDS_REVISION: "needs_revision",
  APPROVED: "approved",
} as const;

export const SubmissionStatusSchema = z.enum([
  "draft",
  "submitted",
  "under_review",
  "needs_revision",
  "approved",
]);
export type SubmissionStatus = z.infer<typeof SubmissionStatusSchema>;

export const DisciplineLabels: Record<Discipline, { zh: string; en: string }> =
  {
    graphic_design: { zh: "平面设计", en: "Graphic Design" },
    industrial_design: { zh: "工业设计", en: "Industrial Design" },
    fashion_design: { zh: "服装设计", en: "Fashion Design" },
    architecture: { zh: "建筑设计", en: "Architecture" },
    interaction_design: { zh: "交互设计", en: "Interaction Design" },
    general: { zh: "通用", en: "General" },
  };

export const CompositionTypeLabels: Record<
  CompositionType,
  { zh: string; en: string }
> = {
  planar: { zh: "平面构成", en: "Planar Composition" },
  color: { zh: "色彩构成", en: "Color Composition" },
  spatial: { zh: "空间构成", en: "Spatial Composition" },
};

export const DifficultyLevelLabels: Record<
  DifficultyLevel,
  { zh: string; en: string }
> = {
  base: { zh: "基础", en: "Base" },
  advance: { zh: "进阶", en: "Advance" },
  stretch: { zh: "拓展", en: "Stretch" },
};

export const LearningStateLabels: Record<
  LearningState,
  { zh: string; en: string }
> = {
  not_started: { zh: "未开始", en: "Not Started" },
  in_progress: { zh: "进行中", en: "In Progress" },
  completed: { zh: "已完成", en: "Completed" },
  reviewed: { zh: "已评阅", en: "Reviewed" },
};

export const AIToolLabels: Record<AITool, { zh: string; en: string }> = {
  midjourney: { zh: "Midjourney", en: "Midjourney" },
  stable_diffusion: { zh: "Stable Diffusion", en: "Stable Diffusion" },
  dalle: { zh: "DALL·E", en: "DALL·E" },
  chinese_ai: { zh: "中文AI工具", en: "Chinese AI Tools" },
  general: { zh: "通用", en: "General" },
};

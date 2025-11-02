export type PromptTier = "beginner" | "intermediate" | "advanced";

export interface PromptTemplate {
  id: string;
  title: string;
  tier: PromptTier;
  role: string;
  task: string;
  methodology: string;
  expectedOutput: string;
  tags: string[];
  category: string;
  createdAt: string;
}

export interface CustomPrompt {
  id: string;
  title: string;
  content: string;
  tags: string[];
  tier: PromptTier;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  baseTemplateId?: string;
}

export interface PromptRecommendation {
  id: string;
  promptId: string;
  courseId: string;
  relevanceScore: number;
  reason: string;
}

export interface AdaptationGuide {
  tool: string;
  description: string;
  adaptationTips: string[];
  exampleOutput: string;
}

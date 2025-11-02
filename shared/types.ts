export type DifficultyLevel = "base" | "advance" | "stretch";
export type KnowledgeCategory = "theory" | "framework" | "lens" | "method";

export interface KnowledgeCard {
  id: string;
  title: string;
  titleEn?: string;
  category: KnowledgeCategory;
  difficulty: DifficultyLevel;
  summary: string;
  coreIdea: string;
  examples: string[];
  applicationTips: string[];
  recommendedReadings: {
    title: string;
    author?: string;
    url?: string;
  }[];
  relatedCards: string[];
  mediaUrl?: string;
  tags: string[];
}

export interface UserCardState {
  cardId: string;
  isFavorite: boolean;
  isStudied: boolean;
  notes?: string;
  lastAccessedAt?: string;
}

export interface CardRelationship {
  from: string;
  to: string;
  type: "prerequisite" | "related" | "application";
  description?: string;
}

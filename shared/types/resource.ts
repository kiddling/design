export type ReadingState = "未读" | "在读" | "已读" | "想读";

export interface Resource {
  id: string;
  title: string;
  author: string;
  year: number;
  summary: string;
  recommendationReason: string;
  externalLink: string;
  tags: string[];
  section: "必读经典" | "当代视角";
}

export interface UserResourceState {
  resourceId: string;
  readingState: ReadingState;
  notes?: string;
  updatedAt: Date;
}

export interface ResourceFilters {
  tags?: string[];
  authors?: string[];
  readingStates?: ReadingState[];
  search?: string;
}

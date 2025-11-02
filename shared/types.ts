export type Discipline =
  | "architecture"
  | "graphic-design"
  | "product-design"
  | "urban-planning"
  | "digital-media";

export type Difficulty = "base" | "advance" | "stretch";

export interface Case {
  id: string;
  title: string;
  discipline: Discipline;
  tags: string[];
  difficulty: Difficulty;
  imageUrl?: string;
  keyInsight: string;
  problem: string;
  deconstruction: string;
  solution: string;
  references: Reference[];
  relatedKnowledge: string[];
  isFavorite?: boolean;
}

export interface Reference {
  title: string;
  url: string;
  type: "article" | "video" | "book" | "website";
}

export interface CaseFilters {
  disciplines: Discipline[];
  tags: string[];
  difficulty: Difficulty[];
  search: string;
  favorites: boolean;
}

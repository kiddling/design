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

export interface KnowledgeCard {
  id: string;
  title: string;
  summary: string;
  category: string;
}

export interface CardRelationship {
  source: string;
  target: string;
  type: "related" | "prerequisite";
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
}

export interface AdaptationGuide {
  id: string;
  title: string;
  description: string;
  tool: string;
}

export interface Workflow {
    id: string;
    title: string;
    description: string;
    steps: {
        title: string;
        description: string;
    }[];
}

export interface CourseOutlineItem {
  id: string;
  title: string;
  description: string;
  week: number;
}

export interface CourseDetail extends CourseOutlineItem {
  objectives: string[];
  resources: string[];
  image?: string;
}

export interface AssignmentFormSchema {
  // Placeholder type - define as needed
  [key: string]: any;
}



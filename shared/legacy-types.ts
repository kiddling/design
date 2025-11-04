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

export type PromptTier = "beginner" | "intermediate" | "advanced";

export interface PromptTemplate {
  id: string;
  title: string;
  description?: string;
  category?: string;
  label?: string;
  prompt?: string;
  tags?: string[];
  tier?: PromptTier;
  role?: string;
  task?: string;
  methodology?: string;
  expectedOutput?: string;
  aiTool?: string;
  createdAt?: string;
  updatedAt?: string;
  tips?: string[];
}

export interface AdaptationGuide {
  tool: string;
  description: string;
  adaptationTips?: string[];
  exampleOutput?: string;
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

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  discipline: string;
  difficulty: string;
  tags?: string[];
  thumbnail?: string;
  imageUrl?: string;
}

export interface AssignmentFormSchema {
  name: string;
  email: string;
  projectUrl: string;
  notes?: string;
}



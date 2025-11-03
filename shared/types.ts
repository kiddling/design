export interface CourseOutlineItem {
  id: string;
  title: string;
  description: string;
  week: number;
}

export interface CourseDetail extends CourseOutlineItem {
  objectives: string[];
  resources: string[];
  image: string;
}

export interface KnowledgeCard {
  id: string;
  title: string;
  summary: string;
  category: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  discipline: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  thumbnail: string;
}

export interface PromptTemplate {
  id: string;
  label: string;
  prompt: string;
}

export interface AssignmentFormSchema {
  name: string;
  email: string;
  projectUrl: string;
  notes?: string;
}

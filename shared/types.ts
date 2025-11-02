// Shared types between client and server

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export type DifficultyLevel = "base" | "advance" | "stretch";

export type SectionType =
  | "goals"
  | "theory"
  | "workflow"
  | "cases"
  | "reading"
  | "assignments"
  | "resources"
  | "tutorial"
  | "examples";

// Course types
export interface Course {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  loop: number;
  session: number;
  duration?: string;
  objectives?: string[];
  sections?: CourseSection[];
  metadata?: CourseMetadata;
}

export interface CourseSection {
  id: string;
  type: SectionType;
  title: string;
  description?: string;
  content?: any; // Rich content structure
  order: number;
}

export interface CourseMetadata {
  tags?: string[];
  difficulty?: DifficultyLevel;
  prerequisites?: string[];
  relatedCourses?: string[];
  relatedKnowledge?: string[];
  relatedCases?: string[];
  lastUpdated?: string;
}

// Knowledge Card types
export interface KnowledgeCard {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  difficulty: DifficultyLevel;
  content?: any;
  tags?: string[];
  relatedCards?: string[];
  relatedCourses?: string[];
  relatedCases?: string[];
}

// Case types
export interface Case {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  difficulty?: DifficultyLevel;
  author?: string;
  year?: string;
  content?: any;
  relatedCourses?: string[];
  relatedKnowledge?: string[];
  relatedPrompts?: string[];
}

// Prompt types
export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  difficulty?: DifficultyLevel;
  template: string;
  variables?: PromptVariable[];
  examples?: PromptExample[];
  tips?: string[];
  relatedCourses?: string[];
  relatedKnowledge?: string[];
  courseSection?: string; // For context-aware recommendations
}

export interface PromptVariable {
  name: string;
  description: string;
  placeholder?: string;
  required?: boolean;
}

export interface PromptExample {
  title: string;
  input: Record<string, string>;
  output: string;
}

// Workflow types
export interface Workflow {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  steps: WorkflowStep[];
  tools?: string[];
  difficulty?: DifficultyLevel;
  duration?: string;
  relatedCourses?: string[];
  relatedPrompts?: string[];
}

export interface WorkflowStep {
  id: string;
  order: number;
  title: string;
  description: string;
  details?: string;
  tips?: string[];
  tools?: string[];
}

// Resource types
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "tool" | "article" | "video" | "book" | "website" | "course";
  url: string;
  category: string;
  tags: string[];
  difficulty?: DifficultyLevel;
  isPremium?: boolean;
  relatedCourses?: string[];
  relatedKnowledge?: string[];
}

// Assignment types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  difficulty: DifficultyLevel;
  type: "text" | "file" | "mixed";
  requirements: AssignmentRequirement[];
  rubric?: AssignmentRubric;
  dueDate?: string;
  maxScore?: number;
  relatedKnowledge?: string[];
  relatedCases?: string[];
  relatedPrompts?: string[];
}

export interface AssignmentRequirement {
  id: string;
  type: "text" | "file" | "image" | "video" | "url";
  label: string;
  description?: string;
  required: boolean;
  validation?: any;
}

export interface AssignmentRubric {
  criteria: RubricCriterion[];
  totalPoints: number;
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  points: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  userId: string;
  status: "draft" | "submitted" | "graded";
  submittedAt?: string;
  fields: SubmissionField[];
  files?: SubmissionFile[];
  score?: number;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionField {
  requirementId: string;
  value: string;
}

export interface SubmissionFile {
  requirementId: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedAt: string;
}

// User State types
export interface UserProgress {
  userId: string;
  courseId: string;
  completedSections: string[];
  currentSection?: string;
  lastAccessed: string;
  progressPercentage: number;
  startedAt: string;
  completedAt?: string;
}

export interface UserFavorite {
  id: string;
  userId: string;
  itemId: string;
  itemType:
    | "course"
    | "knowledge"
    | "case"
    | "prompt"
    | "workflow"
    | "resource";
  createdAt: string;
}

export interface UserHistoryItem {
  id: string;
  userId: string;
  itemId: string;
  itemType:
    | "course"
    | "knowledge"
    | "case"
    | "prompt"
    | "workflow"
    | "resource";
  action: "view" | "complete" | "favorite" | "submit";
  timestamp: string;
  metadata?: any;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface RecommendationResponse {
  prompts: Prompt[];
  reason?: string;
  relatedCourseSection?: string;
}

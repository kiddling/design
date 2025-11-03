export interface Assignment {
  id: string;
  code: string;
  title: string;
  description: string;
  dueDate: string;
  requirements: AssignmentRequirement[];
  rubric: RubricCriterion[];
  maxScore: number;
  status: "draft" | "published" | "closed";
}

export interface AssignmentRequirement {
  id: string;
  title: string;
  description: string;
  type: "file" | "text" | "diagram" | "photo";
  required: boolean;
  completed?: boolean;
}

export interface RubricCriterion {
  id: string;
  name: string;
  weight: number;
  description: string;
  levels: RubricLevel[];
}

export interface RubricLevel {
  score: number;
  label: string;
  description: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  userId: string;
  submittedAt: string;
  status: "draft" | "submitted" | "graded";
  files: SubmissionFile[];
  textFields: Record<string, string>;
  score?: number;
  feedback?: string;
}

export interface SubmissionFile {
  id: string;
  filename: string;
  originalName: string;
  path: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
  type: "photo" | "diagram" | "document" | "other";
}

export interface UserProgress {
  userId: string;
  assignmentId: string;
  checklist: Record<string, boolean>;
  lastUpdated: string;
}

export interface UploadProgress {
  filename: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  error?: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  order: number;
  checklist: ChecklistItem[];
  media?: MediaItem[];
  guidance: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt: string;
  caption?: string;
}

export interface JanGehlStage {
  id: string;
  title: string;
  description: string;
  content: string;
  examples: MediaItem[];
  tips: string[];
}

export interface ToolRecommendation {
  id: string;
  name: string;
  category: string;
  url: string;
  icon: string;
  description: string;
  summary: string;
  quickTips: string[];
  used: boolean;
}

export interface DownloadableTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  format: string;
  fileSize: string;
  thumbnailUrl: string;
  downloadUrl: string;
  downloadCount: number;
}

export interface BauhausAnalysis {
  type: "physical-decomposition" | "force-field";
  elements: AnalysisElement[];
}

export interface AnalysisElement {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  connections?: string[];
}

export interface WorkflowProgress {
  userId: string;
  completedSteps: string[];
  checklistProgress: Record<string, string[]>;
  usedTools: string[];
  downloadedTemplates: string[];
  notes: Record<string, string>;
  lastUpdated: string;
  overallProgress: number;
}

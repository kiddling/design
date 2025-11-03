export interface Course {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  duration: string;
  objectives: string[];
  sections: CourseSection[];
  metadata: CourseMetadata;
}

export interface CourseSection {
  id: string;
  type: SectionType;
  title: string;
  content: RichContent;
  order: number;
}

export type SectionType =
  | "goals"
  | "theory"
  | "workflow"
  | "cases"
  | "reading"
  | "assignments"
  | "resources";

export interface RichContent {
  blocks: ContentBlock[];
}

export type ContentBlock =
  | TextBlock
  | ImageBlock
  | QuoteBlock
  | CalloutBlock
  | ListBlock
  | TabsBlock
  | TimelineBlock
  | CardGridBlock;

export interface TextBlock {
  type: "text";
  content: string;
  format?: "paragraph" | "heading" | "subheading";
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface QuoteBlock {
  type: "quote";
  content: string;
  author?: string;
  source?: string;
}

export interface CalloutBlock {
  type: "callout";
  variant: "info" | "warning" | "success" | "tip";
  title?: string;
  content: string;
}

export interface ListBlock {
  type: "list";
  items: string[];
  ordered?: boolean;
}

export interface TabsBlock {
  type: "tabs";
  tabs: TabItem[];
}

export interface TabItem {
  id: string;
  label: string;
  content: ContentBlock[];
}

export interface TimelineBlock {
  type: "timeline";
  steps: TimelineStep[];
}

export interface TimelineStep {
  id: string;
  label: string;
  description: string;
  icon?: string;
}

export interface CardGridBlock {
  type: "card-grid";
  cards: CardItem[];
  columns?: number;
}

export interface CardItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  tags?: string[];
}

export interface CourseMetadata {
  level: "beginner" | "intermediate" | "advanced";
  tags: string[];
  prerequisites?: string[];
  relatedCourses?: string[];
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedSections: string[];
  lastAccessed: string;
  progressPercentage: number;
}

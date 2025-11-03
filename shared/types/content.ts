import { z } from "zod";
import {
  DifficultyLevelSchema,
  DisciplineSchema,
  CompositionTypeSchema,
  LearningStateSchema,
  AIToolSchema,
  ResourceTypeSchema,
  SubmissionStatusSchema,
} from "./enums.js";

export const EntityRelationSchema = z.object({
  fromId: z.string(),
  toId: z.string(),
  relationType: z.enum([
    "prerequisite",
    "related",
    "extends",
    "applies_to",
    "part_of",
    "references",
  ]),
  weight: z.number().min(0).max(1).optional(),
  description: z.string().optional(),
});

export type EntityRelation = z.infer<typeof EntityRelationSchema>;

export const MediaItemSchema = z.object({
  url: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  credit: z.string().optional(),
});

export type MediaItem = z.infer<typeof MediaItemSchema>;

export const WorkflowStepSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  description: z.string(),
  tips: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  estimatedTime: z.string().optional(),
  resources: z.array(z.string()).optional(),
});

export type WorkflowStep = z.infer<typeof WorkflowStepSchema>;

export const PromptTemplateSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  aiTool: AIToolSchema,
  difficulty: DifficultyLevelSchema,
  template: z.string(),
  parameters: z.record(z.string(), z.string()).optional(),
  examples: z.array(z.string()).optional(),
  tags: z.array(z.string()),
  relatedSections: z.array(z.string()).optional(),
  tips: z.array(z.string()).optional(),
});

export type PromptTemplate = z.infer<typeof PromptTemplateSchema>;

export const PromptSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  difficulty: DifficultyLevelSchema,
  template: z.string(),
  variables: z.array(z.object({
    name: z.string(),
    description: z.string(),
    placeholder: z.string(),
    required: z.boolean(),
  })),
  examples: z.array(z.object({
    title: z.string(),
    input: z.record(z.string(), z.string()),
    output: z.string(),
  })),
  tips: z.array(z.string()),
  relatedCourses: z.array(z.string()).optional(),
  relatedKnowledge: z.array(z.string()).optional(),
  courseSection: z.string().optional(),
});

export type Prompt = z.infer<typeof PromptSchema>;

export const WorkflowSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  difficulty: DifficultyLevelSchema,
  duration: z.string(),
  tools: z.array(z.string()),
  steps: z.array(z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    description: z.string(),
    details: z.string().optional(),
    tips: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
  })),
  relatedCourses: z.array(z.string()).optional(),
  relatedPrompts: z.array(z.string()).optional(),
});

export type Workflow = z.infer<typeof WorkflowSchema>;

export const KnowledgeCardPreviewSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  compositionType: CompositionTypeSchema,
  difficulty: DifficultyLevelSchema,
  thumbnail: z.string().optional(),
  tags: z.array(z.string()),
  relatedCards: z.array(z.string()).optional(),
});

export type KnowledgeCardPreview = z.infer<typeof KnowledgeCardPreviewSchema>;

export const KnowledgeCardDetailSchema = KnowledgeCardPreviewSchema.extend({
  content: z.string(),
  theory: z.object({
    principles: z.array(z.string()),
    examples: z.array(MediaItemSchema),
    references: z.array(z.string()).optional(),
  }),
  applications: z.array(z.string()).optional(),
  caseStudies: z.array(z.string()).optional(),
  prompts: z.array(z.string()).optional(),
  exercises: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        difficulty: DifficultyLevelSchema,
      })
    )
    .optional(),
});

export type KnowledgeCardDetail = z.infer<typeof KnowledgeCardDetailSchema>;

export const KnowledgeCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  category: z.string(),
  difficulty: DifficultyLevelSchema,
  tags: z.array(z.string()),
  relatedCourses: z.array(z.string()).optional(),
  relatedCases: z.array(z.string()).optional(),
});

export type KnowledgeCard = z.infer<typeof KnowledgeCardSchema>;

export const CaseStudySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  discipline: DisciplineSchema,
  compositionTypes: z.array(CompositionTypeSchema),
  difficulty: DifficultyLevelSchema,
  images: z.array(MediaItemSchema),
  analysis: z.string(),
  techniques: z.array(z.string()),
  keyPoints: z.array(z.string()),
  tags: z.array(z.string()),
  externalLink: z.string().optional(),
  designer: z.string().optional(),
  year: z.string().optional(),
  relatedCases: z.array(z.string()).optional(),
  relatedCards: z.array(z.string()).optional(),
});

export type CaseStudy = z.infer<typeof CaseStudySchema>;

export const CaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  difficulty: DifficultyLevelSchema,
  author: z.string().optional(),
  year: z.string().optional(),
  relatedCourses: z.array(z.string()).optional(),
  relatedKnowledge: z.array(z.string()).optional(),
  relatedPrompts: z.array(z.string()).optional(),
});

export type Case = z.infer<typeof CaseSchema>;

export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string(),
  isbn: z.string().optional(),
  publisher: z.string().optional(),
  year: z.string().optional(),
  cover: z.string().optional(),
  category: z.enum(["classic", "contemporary", "reference"]),
  tags: z.array(z.string()),
  link: z.string().optional(),
});

export type Book = z.infer<typeof BookSchema>;

export const ResourceItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: ResourceTypeSchema,
  url: z.string(),
  tags: z.array(z.string()),
  isPremium: z.boolean().optional(),
  language: z.enum(["zh", "en", "both"]).optional(),
  difficulty: DifficultyLevelSchema.optional(),
});

export type ResourceItem = z.infer<typeof ResourceItemSchema>;

export const RubricCriterionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  maxScore: z.number(),
  levels: z
    .array(
      z.object({
        score: z.number(),
        description: z.string(),
      })
    )
    .optional(),
});

export type RubricCriterion = z.infer<typeof RubricCriterionSchema>;

export const AssignmentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  courseId: z.string(),
  difficulty: DifficultyLevelSchema,
  type: z.string(),
  requirements: z.array(z.object({
    id: z.string(),
    type: z.string(),
    label: z.string(),
    description: z.string(),
    required: z.boolean(),
  })),
  rubric: z.object({
    criteria: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      points: z.number(),
    })),
    totalPoints: z.number(),
  }),
  maxScore: z.number(),
  relatedKnowledge: z.array(z.string()).optional(),
  relatedCases: z.array(z.string()).optional(),
  relatedPrompts: z.array(z.string()).optional(),
});

export type Assignment = z.infer<typeof AssignmentSchema>;

export const SubmissionSchema = z.object({
  id: z.string(),
  assignmentId: z.string(),
  userId: z.string(),
  status: SubmissionStatusSchema,
  submittedAt: z.string().datetime().optional(),
  files: z.array(MediaItemSchema),
  reflection: z.string().optional(),
  peerReviews: z
    .array(
      z.object({
        reviewerId: z.string(),
        comment: z.string(),
        rating: z.number().min(1).max(5),
      })
    )
    .optional(),
  instructorFeedback: z
    .object({
      scores: z.record(z.string(), z.number()),
      comment: z.string(),
      suggestions: z.array(z.string()).optional(),
    })
    .optional(),
});

export type Submission = z.infer<typeof SubmissionSchema>;

export const CourseSectionSchema = z.object({
  id: z.string(),
  lessonNumber: z.number(),
  title: z.string(),
  subtitle: z.string().optional(),
  loop: z.enum(["concept_sprint", "form_sprint", "refinement_sprint"]),
  loopNumber: z.number().min(1).max(3),
  description: z.string(),
  objectives: z.array(z.string()),
  keyActivities: z.array(z.string()),
  deliverables: z.array(z.string()),
  duration: z.string(),
  difficulty: DifficultyLevelSchema,
  knowledgeCards: z.array(z.string()).optional(),
  caseStudies: z.array(z.string()).optional(),
  assignments: z.array(z.string()).optional(),
  resources: z.array(z.string()).optional(),
  prompts: z.array(z.string()).optional(),
  workflows: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
});

export type CourseSection = z.infer<typeof CourseSectionSchema>;

export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  goals: z.array(z.string()),
  philosophies: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        key_concepts: z.array(z.string()),
      })
    )
    .optional(),
  sections: z.array(CourseSectionSchema),
  totalDuration: z.string(),
  level: DifficultyLevelSchema,
  prerequisites: z.array(z.string()).optional(),
});

export type Course = z.infer<typeof CourseSchema>;

export const UserProgressSchema = z.object({
  userId: z.string(),
  sectionId: z.string(),
  state: LearningStateSchema,
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  timeSpent: z.number().optional(),
  notes: z.string().optional(),
  bookmarkedCards: z.array(z.string()).optional(),
  completedExercises: z.array(z.string()).optional(),
  achievements: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        earnedAt: z.string().datetime(),
      })
    )
    .optional(),
});

export type UserProgress = z.infer<typeof UserProgressSchema>;

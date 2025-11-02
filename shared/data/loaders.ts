import { z } from "zod";
import {
  CourseSchema,
  KnowledgeCardDetailSchema,
  CaseStudySchema,
  PromptTemplateSchema,
  WorkflowStepSchema,
  ResourceItemSchema,
  BookSchema,
  AssignmentSchema,
  EntityRelationSchema,
} from "../types/index.js";
import { digitalDesignCompositionCourse } from "./course.js";
import { knowledgeCards } from "./knowledge-cards.js";
import { caseStudies } from "./case-studies.js";
import { promptTemplates } from "./prompts.js";
import { workflows } from "./workflows.js";
import { resources, books } from "./resources.js";
import { assignments } from "./assignments.js";
import { entityRelationships } from "./relationships.js";

export interface DataValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
}

export function validateCourse(): DataValidationResult<
  typeof digitalDesignCompositionCourse
> {
  try {
    const validated = CourseSchema.parse(digitalDesignCompositionCourse);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

export function validateKnowledgeCards(): DataValidationResult<
  typeof knowledgeCards
> {
  try {
    const validated = z.array(KnowledgeCardDetailSchema).parse(knowledgeCards);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

export function validateCaseStudies(): DataValidationResult<
  typeof caseStudies
> {
  try {
    const validated = z.array(CaseStudySchema).parse(caseStudies);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

export function validatePrompts(): DataValidationResult<
  typeof promptTemplates
> {
  try {
    const validated = z.array(PromptTemplateSchema).parse(promptTemplates);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

export function validateWorkflows(): DataValidationResult<typeof workflows> {
  try {
    const validated = z
      .record(z.string(), z.array(WorkflowStepSchema))
      .parse(workflows);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

export function validateResources(): DataValidationResult<typeof resources> {
  try {
    const validated = z.array(ResourceItemSchema).parse(resources);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

export function validateBooks(): DataValidationResult<typeof books> {
  try {
    const validated = z.array(BookSchema).parse(books);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

export function validateAssignments(): DataValidationResult<
  typeof assignments
> {
  try {
    const validated = z.array(AssignmentSchema).parse(assignments);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

export function validateRelationships(): DataValidationResult<
  typeof entityRelationships
> {
  try {
    const validated = z.array(EntityRelationSchema).parse(entityRelationships);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

export function validateAllData(): {
  course: DataValidationResult<typeof digitalDesignCompositionCourse>;
  knowledgeCards: DataValidationResult<typeof knowledgeCards>;
  caseStudies: DataValidationResult<typeof caseStudies>;
  prompts: DataValidationResult<typeof promptTemplates>;
  workflows: DataValidationResult<typeof workflows>;
  resources: DataValidationResult<typeof resources>;
  books: DataValidationResult<typeof books>;
  assignments: DataValidationResult<typeof assignments>;
  relationships: DataValidationResult<typeof entityRelationships>;
} {
  return {
    course: validateCourse(),
    knowledgeCards: validateKnowledgeCards(),
    caseStudies: validateCaseStudies(),
    prompts: validatePrompts(),
    workflows: validateWorkflows(),
    resources: validateResources(),
    books: validateBooks(),
    assignments: validateAssignments(),
    relationships: validateRelationships(),
  };
}

export function getCourse() {
  const result = validateCourse();
  if (!result.success) {
    throw new Error(`Course data validation failed: ${result.errors?.message}`);
  }
  return result.data!;
}

export function getKnowledgeCards() {
  const result = validateKnowledgeCards();
  if (!result.success) {
    throw new Error(
      `Knowledge cards validation failed: ${result.errors?.message}`
    );
  }
  return result.data!;
}

export function getKnowledgeCardById(id: string) {
  const cards = getKnowledgeCards();
  return cards!.find(card => card.id === id);
}

export function getCaseStudies() {
  const result = validateCaseStudies();
  if (!result.success) {
    throw new Error(
      `Case studies validation failed: ${result.errors?.message}`
    );
  }
  return result.data!;
}

export function getCaseStudyById(id: string) {
  const cases = getCaseStudies();
  return cases.find(caseStudy => caseStudy.id === id);
}

export function getPrompts() {
  const result = validatePrompts();
  if (!result.success) {
    throw new Error(`Prompts validation failed: ${result.errors?.message}`);
  }
  return result.data!;
}

export function getPromptById(id: string) {
  const prompts = getPrompts();
  return prompts.find(prompt => prompt.id === id);
}

export function getWorkflows() {
  const result = validateWorkflows();
  if (!result.success) {
    throw new Error(`Workflows validation failed: ${result.errors?.message}`);
  }
  return result.data!;
}

export function getWorkflowById(id: string) {
  const workflowsData = getWorkflows();
  return workflowsData[id];
}

export function getResources() {
  const result = validateResources();
  if (!result.success) {
    throw new Error(`Resources validation failed: ${result.errors?.message}`);
  }
  return result.data!;
}

export function getResourceById(id: string) {
  const resourcesData = getResources();
  return resourcesData.find(resource => resource.id === id);
}

export function getBooks() {
  const result = validateBooks();
  if (!result.success) {
    throw new Error(`Books validation failed: ${result.errors?.message}`);
  }
  return result.data!;
}

export function getBookById(id: string) {
  const booksData = getBooks();
  return booksData.find(book => book.id === id);
}

export function getAssignments() {
  const result = validateAssignments();
  if (!result.success) {
    throw new Error(`Assignments validation failed: ${result.errors?.message}`);
  }
  return result.data!;
}

export function getAssignmentById(id: string) {
  const assignmentsData = getAssignments();
  return assignmentsData.find(assignment => assignment.id === id);
}

export function getAssignmentsByLessonId(lessonId: string) {
  const assignmentsData = getAssignments();
  return assignmentsData.filter(assignment => assignment.lessonId === lessonId);
}

export function getRelationships() {
  const result = validateRelationships();
  if (!result.success) {
    throw new Error(
      `Relationships validation failed: ${result.errors?.message}`
    );
  }
  return result.data!;
}

export function getRelatedEntities(entityId: string, relationType?: string) {
  const relationships = getRelationships();
  return relationships.filter(
    rel =>
      (rel.fromId === entityId || rel.toId === entityId) &&
      (!relationType || rel.relationType === relationType)
  );
}

export function getPrerequisites(entityId: string) {
  const relationships = getRelationships();
  return relationships.filter(
    rel => rel.toId === entityId && rel.relationType === "prerequisite"
  );
}

export function getDependents(entityId: string) {
  const relationships = getRelationships();
  return relationships.filter(
    rel => rel.fromId === entityId && rel.relationType === "prerequisite"
  );
}

export * from "./course.js";
export * from "./knowledge-cards.js";
export * from "./case-studies.js";
export * from "./prompts.js";
export * from "./workflows.js";
export * from "./resources.js";
export * from "./assignments.js";
export * from "./relationships.js";

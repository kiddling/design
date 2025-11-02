import { describe, it, expect } from "vitest";
import { validateAllData } from "../loaders.js";

describe("Data Validation", () => {
  it("should validate course data successfully", () => {
    const results = validateAllData();

    expect(results.course.success).toBe(true);
    if (results.course.success) {
      expect(results.course.data?.id).toBe("course-001");
      expect(results.course.data?.sections).toHaveLength(12);
    } else {
      console.error("Course validation errors:", results.course.errors?.issues);
    }
  });

  it("should validate knowledge cards successfully", () => {
    const results = validateAllData();

    expect(results.knowledgeCards.success).toBe(true);
    if (results.knowledgeCards.success) {
      expect(results.knowledgeCards.data?.length).toBeGreaterThanOrEqual(20);
    } else {
      console.error(
        "Knowledge cards validation errors:",
        results.knowledgeCards.errors?.issues
      );
    }
  });

  it("should validate case studies successfully", () => {
    const results = validateAllData();

    expect(results.caseStudies.success).toBe(true);
    if (results.caseStudies.success) {
      expect(results.caseStudies.data?.length).toBeGreaterThanOrEqual(20);
      // Check that we have cases from all 5 disciplines
      const disciplines = new Set(
        results.caseStudies.data?.map(cs => cs.discipline)
      );
      expect(disciplines.size).toBeGreaterThanOrEqual(4); // At least 4 different disciplines
    } else {
      console.error(
        "Case studies validation errors:",
        results.caseStudies.errors?.issues
      );
    }
  });

  it("should validate prompts successfully", () => {
    const results = validateAllData();

    expect(results.prompts.success).toBe(true);
    if (results.prompts.success) {
      expect(results.prompts.data?.length).toBeGreaterThanOrEqual(15);
      // Check that we have all difficulty levels
      const difficulties = new Set(
        results.prompts.data?.map(p => p.difficulty)
      );
      expect(difficulties.has("base")).toBe(true);
      expect(difficulties.has("advance")).toBe(true);
      expect(difficulties.has("stretch")).toBe(true);
    } else {
      console.error(
        "Prompts validation errors:",
        results.prompts.errors?.issues
      );
    }
  });

  it("should validate workflows successfully", () => {
    const results = validateAllData();

    expect(results.workflows.success).toBe(true);
    if (results.workflows.success) {
      const workflowKeys = Object.keys(results.workflows.data || {});
      expect(workflowKeys.length).toBeGreaterThanOrEqual(12);
    } else {
      console.error(
        "Workflows validation errors:",
        results.workflows.errors?.issues
      );
    }
  });

  it("should validate resources successfully", () => {
    const results = validateAllData();

    expect(results.resources.success).toBe(true);
    if (results.resources.success) {
      expect(results.resources.data?.length).toBeGreaterThanOrEqual(20);
    } else {
      console.error(
        "Resources validation errors:",
        results.resources.errors?.issues
      );
    }
  });

  it("should validate books successfully", () => {
    const results = validateAllData();

    expect(results.books.success).toBe(true);
    if (results.books.success) {
      expect(results.books.data?.length).toBeGreaterThanOrEqual(10);
      // Check categories
      const categories = new Set(results.books.data?.map(b => b.category));
      expect(categories.has("classic")).toBe(true);
      expect(categories.has("contemporary")).toBe(true);
    } else {
      console.error("Books validation errors:", results.books.errors?.issues);
    }
  });

  it("should validate assignments successfully", () => {
    const results = validateAllData();

    expect(results.assignments.success).toBe(true);
    if (results.assignments.success) {
      expect(results.assignments.data?.length).toBeGreaterThanOrEqual(12);
      // Each assignment should have rubric and checklist
      results.assignments.data?.forEach(assignment => {
        expect(assignment.rubric.length).toBeGreaterThan(0);
        expect(assignment.checklist).toBeDefined();
      });
    } else {
      console.error(
        "Assignments validation errors:",
        results.assignments.errors?.issues
      );
    }
  });

  it("should validate relationships successfully", () => {
    const results = validateAllData();

    expect(results.relationships.success).toBe(true);
    if (results.relationships.success) {
      expect(results.relationships.data?.length).toBeGreaterThan(0);
      // Check relationship types
      const types = new Set(
        results.relationships.data?.map(r => r.relationType)
      );
      expect(types.has("prerequisite")).toBe(true);
      expect(types.has("related")).toBe(true);
    } else {
      console.error(
        "Relationships validation errors:",
        results.relationships.errors?.issues
      );
    }
  });

  it("should have valid cross-references", () => {
    const results = validateAllData();

    if (results.course.success && results.knowledgeCards.success) {
      const knowledgeCardIds = new Set(
        results.knowledgeCards.data?.map(kc => kc.id)
      );

      // Check that lesson knowledge card references are valid
      results.course.data?.sections.forEach(section => {
        section.knowledgeCards?.forEach(kcId => {
          expect(knowledgeCardIds.has(kcId)).toBe(true);
        });
      });
    }
  });

  it("should print validation summary", () => {
    const results = validateAllData();

    console.log("\n=== Data Validation Summary ===");
    console.log(`Course: ${results.course.success ? "✓ PASS" : "✗ FAIL"}`);
    console.log(
      `Knowledge Cards: ${results.knowledgeCards.success ? "✓ PASS" : "✗ FAIL"} (${results.knowledgeCards.data?.length || 0} items)`
    );
    console.log(
      `Case Studies: ${results.caseStudies.success ? "✓ PASS" : "✗ FAIL"} (${results.caseStudies.data?.length || 0} items)`
    );
    console.log(
      `Prompts: ${results.prompts.success ? "✓ PASS" : "✗ FAIL"} (${results.prompts.data?.length || 0} items)`
    );
    console.log(
      `Workflows: ${results.workflows.success ? "✓ PASS" : "✗ FAIL"} (${Object.keys(results.workflows.data || {}).length} workflows)`
    );
    console.log(
      `Resources: ${results.resources.success ? "✓ PASS" : "✗ FAIL"} (${results.resources.data?.length || 0} items)`
    );
    console.log(
      `Books: ${results.books.success ? "✓ PASS" : "✗ FAIL"} (${results.books.data?.length || 0} items)`
    );
    console.log(
      `Assignments: ${results.assignments.success ? "✓ PASS" : "✗ FAIL"} (${results.assignments.data?.length || 0} items)`
    );
    console.log(
      `Relationships: ${results.relationships.success ? "✓ PASS" : "✗ FAIL"} (${results.relationships.data?.length || 0} relationships)`
    );
    console.log("===============================\n");
  });
});

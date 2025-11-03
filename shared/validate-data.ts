#!/usr/bin/env tsx

/**
 * Data Validation Script
 *
 * Validates all course content data using Zod schemas.
 * Run with: npx tsx shared/validate-data.ts
 */

import { validateAllData } from "./data/loaders.js";

console.log("\n" + "=".repeat(60));
console.log("  📚 Course Content Data Validation");
console.log("=".repeat(60) + "\n");

const results = validateAllData();

const checks = [
  { name: "Course Structure", result: results.course, expectedMin: 1 },
  { name: "Knowledge Cards", result: results.knowledgeCards, expectedMin: 20 },
  { name: "Case Studies", result: results.caseStudies, expectedMin: 20 },
  { name: "AI Prompt Templates", result: results.prompts, expectedMin: 15 },
  { name: "Workflows", result: results.workflows, expectedMin: 12 },
  { name: "Learning Resources", result: results.resources, expectedMin: 20 },
  { name: "Books", result: results.books, expectedMin: 10 },
  { name: "Assignments", result: results.assignments, expectedMin: 12 },
  {
    name: "Entity Relationships",
    result: results.relationships,
    expectedMin: 50,
  },
];

let allPass = true;

checks.forEach(check => {
  const count = Array.isArray(check.result.data)
    ? check.result.data.length
    : typeof check.result.data === "object" && check.result.data !== null
      ? Object.keys(check.result.data).length
      : 1;

  const passed = check.result.success && count >= check.expectedMin;
  allPass = allPass && passed;

  const icon = passed ? "✓" : "✗";
  const status = passed ? "PASS" : "FAIL";
  console.log(
    `${icon} ${check.name.padEnd(25)} ${status.padEnd(8)} (${count} items)`
  );

  if (!check.result.success && check.result.errors) {
    console.error("  Validation errors:", check.result.errors.issues);
  }
});

console.log("\n" + "=".repeat(60));
console.log(
  allPass ? "✓ All validations passed!" : "✗ Some validations failed!"
);
console.log("=".repeat(60) + "\n");

if (allPass && results.course.success && results.course.data) {
  console.log("📖 Course Overview:");
  console.log(`   Title: ${results.course.data.title}`);
  console.log(`   Sections: ${results.course.data.sections.length}`);
  console.log(`   Duration: ${results.course.data.totalDuration}`);

  if (results.knowledgeCards.success && results.knowledgeCards.data) {
    const byDifficulty = new Map<string, number>();
    results.knowledgeCards.data.forEach(kc => {
      byDifficulty.set(
        kc.difficulty,
        (byDifficulty.get(kc.difficulty) || 0) + 1
      );
    });
    console.log("\n🎓 Knowledge Cards:");
    byDifficulty.forEach((count, difficulty) => {
      console.log(`   - ${difficulty}: ${count}`);
    });
  }

  if (results.caseStudies.success && results.caseStudies.data) {
    const byDiscipline = new Map<string, number>();
    results.caseStudies.data.forEach(cs => {
      byDiscipline.set(
        cs.discipline,
        (byDiscipline.get(cs.discipline) || 0) + 1
      );
    });
    console.log("\n🎨 Case Studies by Discipline:");
    byDiscipline.forEach((count, discipline) => {
      console.log(`   - ${discipline}: ${count}`);
    });
  }

  if (results.prompts.success && results.prompts.data) {
    const byTool = new Map<string, number>();
    const byDifficulty = new Map<string, number>();
    results.prompts.data.forEach(p => {
      byTool.set(p.aiTool, (byTool.get(p.aiTool) || 0) + 1);
      byDifficulty.set(p.difficulty, (byDifficulty.get(p.difficulty) || 0) + 1);
    });
    console.log("\n🤖 AI Prompts:");
    console.log("   By Tool:");
    byTool.forEach((count, tool) => {
      console.log(`     - ${tool}: ${count}`);
    });
    console.log("   By Difficulty:");
    byDifficulty.forEach((count, difficulty) => {
      console.log(`     - ${difficulty}: ${count}`);
    });
  }

  console.log("");
}

process.exit(allPass ? 0 : 1);

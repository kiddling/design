# Shared Data Models and Content

This directory contains strongly-typed content data and type definitions for the "观·元素解构" (Digital Design Composition) course.

## Directory Structure

```
shared/
├── types/          # TypeScript interfaces and Zod schemas
│   ├── enums.ts    # Enumerations and constants
│   ├── content.ts  # Content type definitions
│   └── index.ts    # Type exports
├── data/           # Structured content data
│   ├── course.ts           # Course structure (12 lessons)
│   ├── knowledge-cards.ts  # Knowledge cards (20 cards)
│   ├── case-studies.ts     # Design case studies (20 cases, 5 disciplines)
│   ├── prompts.ts          # AI prompt templates (19 prompts, tiered)
│   ├── workflows.ts        # Step-by-step workflows (12 workflows)
│   ├── resources.ts        # Learning resources (20 resources + 15 books)
│   ├── assignments.ts      # Assignments with rubrics (12 assignments)
│   ├── relationships.ts    # Entity relationships (88 relationships)
│   ├── loaders.ts          # Data loading and validation utilities
│   └── index.ts            # Data exports
└── index.ts        # Main export file
```

## Type System

### Core Types

- **Course** - Complete course structure with 12 sections (lessons)
- **CourseSection** - Individual lesson with objectives, activities, deliverables
- **KnowledgeCard** - Theory cards with preview and detail variants
- **CaseStudy** - Design case studies across 5 disciplines
- **PromptTemplate** - AI tool prompt templates (tiered by difficulty)
- **WorkflowStep** - Step-by-step workflow instructions
- **ResourceItem** - Learning resources (tools, tutorials, articles)
- **Book** - Reading list (classics and contemporary)
- **Assignment** - Assignments with rubrics and checklists
- **EntityRelation** - Cross-references between entities
- **UserProgress** - User learning state tracking
- **Submission** - Assignment submissions with feedback

### Enumerations

- **DifficultyLevel**: `base` | `advance` | `stretch`
- **Discipline**: `graphic_design` | `industrial_design` | `fashion_design` | `architecture` | `interaction_design` | `general`
- **CompositionType**: `planar` | `color` | `spatial`
- **LearningState**: `not_started` | `in_progress` | `completed` | `reviewed`
- **AITool**: `midjourney` | `stable_diffusion` | `dalle` | `chinese_ai` | `general`
- **ResourceType**: `tool` | `tutorial` | `article` | `video` | `book` | `website`

## Content Data

### Course Structure

- **12 Lessons** organized in 3 loops:
  - Loop 1: 概念冲刺 (Concept Sprint) - Lessons 1-2
  - Loop 2: 形态冲刺 (Form Sprint) - Lessons 3-7
  - Loop 3: 精炼冲刺 (Refinement Sprint) - Lessons 8-12

### Content Coverage

- **20 Knowledge Cards** covering:
  - Basic elements (point, line, plane)
  - Balance and composition
  - Space and perspective
  - Light and shadow
  - Color theory
  - Rhythm and texture
  - Cross-disciplinary thinking
  - Design criticism and portfolio

- **20 Case Studies** across 5 disciplines:
  - Graphic Design (12 cases)
  - Industrial Design (2 cases)
  - Fashion Design (3 cases)
  - Architecture (2 cases)
  - General (1 case)

- **19 AI Prompt Templates** for:
  - Midjourney (15 prompts)
  - Stable Diffusion (3 prompts)
  - Chinese AI tools (1 prompt)
  - Tiered by difficulty: base, advance, stretch

- **12 Workflows** - Step-by-step guides for each lesson

- **20 Resources + 15 Books**:
  - Online tools and platforms
  - Tutorials and videos
  - Classic design theory books
  - Contemporary design books

- **12 Assignments** with:
  - Learning objectives
  - Requirements and deliverables
  - Detailed rubrics (4 criteria each)
  - Checklists

- **88 Entity Relationships** mapping:
  - Knowledge card connections
  - Lesson prerequisites
  - Case study references
  - Prompt applications
  - Cross-references for recommendations

## Usage

### TypeScript/JavaScript

```typescript
import {
  getCourse,
  getKnowledgeCards,
  getCaseStudies,
  getPrompts,
  getWorkflows,
  getResources,
  getBooks,
  getAssignments,
  getRelationships,
} from "@shared/data";

// Get validated course data
const course = getCourse();
console.log(course.title); // "数字设计构成"

// Get specific items by ID
const card = getKnowledgeCardById("kc-001");
const caseStudy = getCaseStudyById("cs-001");
const prompt = getPromptById("prompt-001");

// Get related entities
const related = getRelatedEntities("kc-001");
const prerequisites = getPrerequisites("lesson-003");
```

### Validation

All data is validated using Zod schemas at load time:

```typescript
import { validateAllData } from "@shared/data";

const results = validateAllData();

if (results.course.success) {
  console.log("Course data valid:", results.course.data);
} else {
  console.error("Validation errors:", results.course.errors);
}
```

### Running Validation

```bash
# Type checking
npm run check

# Data validation test
npx tsx test-data.mjs
```

## Content Philosophy

The course content is based on:

1. **Kandinsky's theory** - Point, line, plane as spiritual elements
2. **Bauhaus principles** - Form follows function, systematic design
3. **Three-loop spiral learning** - Concept → Form → Refinement
4. **AI-augmented design** - Integrating AI tools in creative process
5. **Cross-disciplinary thinking** - Applying principles across fields

## Relationships and Graph Visualization

The relationship system enables:

- **Knowledge graph** - Visualize concept connections
- **Learning paths** - Show prerequisite chains
- **Contextual recommendations** - Related cards, cases, prompts
- **Cross-references** - Link lessons, cards, cases, and prompts

Relationship types:

- `prerequisite` - Required prior knowledge
- `related` - Conceptually connected
- `extends` - Builds upon concept
- `applies_to` - Practical application
- `part_of` - Compositional hierarchy
- `references` - Example or citation

## Internationalization

All labels and UI text have Chinese and English translations:

```typescript
import { DisciplineLabels, DifficultyLevelLabels } from "@shared/types";

console.log(DisciplineLabels.graphic_design.zh); // "平面设计"
console.log(DisciplineLabels.graphic_design.en); // "Graphic Design"
```

## Data Integrity

- All IDs are unique and validated
- Cross-references are checked for validity
- Zod schemas ensure type safety
- Required fields are enforced
- Enums prevent invalid values

## Development

To add new content:

1. Add data to appropriate file in `shared/data/`
2. Ensure IDs are unique
3. Add relationships in `relationships.ts`
4. Run `npx tsx test-data.mjs` to validate
5. Run `npm run check` for type checking

## License

This content is part of the Digital Design Composition course materials.

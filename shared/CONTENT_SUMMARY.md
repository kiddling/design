# Content Data Summary

## Overview

This shared module contains comprehensive, strongly-typed content for the "观·元素解构" (Digital Design Composition) course, including course structure, knowledge cards, case studies, AI prompt templates, workflows, resources, assignments, and relationship metadata.

## Validation Status

✅ **All data validated successfully**

Run validation: `npx tsx shared/validate-data.ts`

## Content Statistics

### Course Structure

- **Title**: 数字设计构成 (Digital Design Composition)
- **Sections**: 12 lessons
- **Duration**: 36-40 hours
- **Loops**: 3 spiral learning cycles
  - Loop 1: 概念冲刺 (Lessons 1-2)
  - Loop 2: 形态冲刺 (Lessons 3-7)
  - Loop 3: 精炼冲刺 (Lessons 8-12)

### Knowledge Cards (20 total)

Comprehensive theory cards covering design fundamentals:

**By Difficulty:**

- Base (6): Foundational concepts (point, line, plane, materials, color basics)
- Advance (12): Advanced principles (balance, space, light, color theory, rhythm)
- Stretch (2): Complex topics (cross-disciplinary, series design)

**Topics Covered:**

- Point, Line, Plane fundamentals
- Material and texture
- Balance (symmetric and asymmetric)
- Spatial composition and perspective
- Light, shadow, and contrast
- Color theory and harmony
- Rhythm and repetition
- Cross-disciplinary design
- Series design methodology
- Design criticism
- Portfolio design
- Continuous learning strategies
- Design trends

### Case Studies (20 total)

**By Discipline:**

- Graphic Design (12): Swiss design, abstract art, typography, branding
- Industrial Design (2): Product design, functionality
- Fashion Design (3): Patterns, textiles, material innovation
- Architecture (2): Spatial design, modern architecture
- General (1): Contemporary trends

**Notable Cases:**

- Josef Müller-Brockmann (Swiss grid systems)
- Wassily Kandinsky (Abstract composition)
- Dieter Rams (Product design)
- Zaha Hadid (Parametric architecture)
- M.C. Escher (Optical illusions)
- Piet Mondrian (Neo-plasticism)
- William Morris (Arts and Crafts)
- Issey Miyake (Material innovation)

### AI Prompt Templates (19 total)

**By AI Tool:**

- Midjourney (15): Comprehensive prompt library
- Stable Diffusion (3): Texture and lighting studies
- Chinese AI (1): Design analysis visualization

**By Difficulty:**

- Base (5): Simple compositions
- Advance (10): Complex techniques
- Stretch (4): Advanced explorations

**Categories:**

- Point/Line/Plane compositions
- Material and texture generation
- Balance and asymmetry
- Perspective and depth
- Light and shadow
- Color and emotion
- Rhythm and patterns
- Cross-disciplinary fusion
- Series variations

### Workflows (12 total)

Step-by-step guides for each lesson with:

- Preparation steps
- Observation and collection
- Creation and experimentation
- AI tool integration
- Reflection and documentation

### Learning Resources (35 total)

**Resources (20):**

- Tools: Canva, Adobe Color, Coolors, Blender
- Tutorials: Composition, photography, design methods
- Platforms: Behance, Dribbble
- Articles: Trends, analysis, methodologies

**Books (15):**

- Classics (7): Kandinsky, Itten, Arnheim, Müller-Brockmann
- Contemporary (6): Kenya Hara, Naoto Fukasawa, design guides
- Reference (2): Color theory, practical guides

### Assignments (12 total)

One assignment per lesson featuring:

- Clear learning objectives
- Specific requirements
- Detailed deliverables
- 4-criteria rubrics (100 points total)
- Comprehensive checklists
- Time estimates
- Tips and resources

**Difficulty Distribution:**

- Base: 4 assignments
- Advance: 6 assignments
- Stretch: 2 assignments

### Entity Relationships (88 total)

**Relationship Types:**

- `prerequisite`: Learning sequence (12)
- `related`: Conceptual connections (20+)
- `applies_to`: Practical applications (15+)
- `part_of`: Hierarchical structure (20+)
- `references`: Citations and examples (20+)

**Enables:**

- Knowledge graph visualization
- Prerequisite chains
- Contextual recommendations
- Cross-references between content types

## Design Philosophy

### Theoretical Foundation

1. **Kandinsky's Point-Line-Plane Theory**
   - Point: Basic unit with position and tension
   - Line: Movement and direction
   - Plane: Space and structure

2. **Bauhaus Principles**
   - Form follows function
   - Geometric abstraction
   - Systematic methodology
   - Industrial integration

3. **Three-Loop Spiral Learning**
   - Loop 1: Observation and concept formation
   - Loop 2: Exploration and experimentation
   - Loop 3: Integration and refinement

### Pedagogical Approach

- **Experiential Learning**: Hands-on observation and creation
- **AI Integration**: Modern tools for design exploration
- **Cross-Disciplinary**: Applications across design fields
- **Reflective Practice**: Criticism and self-assessment
- **Series Thinking**: Deep exploration of themes

## Technical Implementation

### Type Safety

- All data validated with Zod schemas
- TypeScript interfaces for type checking
- Compile-time error detection
- Runtime validation

### Data Integrity

- Unique IDs for all entities
- Valid cross-references
- Consistent enumerations
- Required field enforcement

### Localization

- Bilingual labels (Chinese/English)
- Cultural context preservation
- Flexible language support

## Usage Examples

### Import and Use Data

```typescript
import { getCourse, getKnowledgeCards } from "@shared/data";

const course = getCourse();
const cards = getKnowledgeCards();
```

### Query Relationships

```typescript
import { getRelatedEntities, getPrerequisites } from "@shared/data";

const related = getRelatedEntities("kc-001");
const prereqs = getPrerequisites("lesson-005");
```

### Filter and Search

```typescript
import { getCaseStudies, getPrompts } from "@shared/data";

const graphicCases = getCaseStudies().filter(
  cs => cs.discipline === "graphic_design"
);

const baseLevelPrompts = getPrompts().filter(p => p.difficulty === "base");
```

## Quality Metrics

✅ **20+ Knowledge Cards** (Target: 20)  
✅ **20+ Case Studies** (Target: 20)  
✅ **15+ AI Prompts** (Target: 15)  
✅ **12 Complete Workflows** (Target: 12)  
✅ **35 Learning Resources** (Target: 30)  
✅ **12 Assignments with Rubrics** (Target: 12)  
✅ **5 Design Disciplines Covered** (Target: 5)  
✅ **88 Entity Relationships** (Target: 50+)

## Maintenance

### Adding New Content

1. Edit appropriate data file in `shared/data/`
2. Ensure unique IDs
3. Add relationships
4. Run validation: `npx tsx shared/validate-data.ts`
5. Type check: `npm run check`

### Updating Schemas

1. Modify schema in `shared/types/`
2. Update data to match
3. Validate all data
4. Update documentation

## Documentation

- **README.md**: Detailed technical documentation
- **CONTENT_SUMMARY.md**: This overview document
- **validate-data.ts**: Validation script with statistics

---

**Last Updated**: November 2024  
**Course**: 数字设计构成 (Digital Design Composition)  
**Status**: ✅ Production Ready

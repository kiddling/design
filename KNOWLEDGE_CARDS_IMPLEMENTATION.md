# Knowledge Cards Implementation

## Overview

This implementation delivers a complete interactive knowledge card system for the Digital Design Composition website, featuring:

- **Preview/Detail Views**: Card grid with expandable detail dialogs
- **Favorites & Progress**: Toggleable states persisted to localStorage
- **Relationship Visualization**: Interactive radial graph showing card connections
- **Filtering & Sorting**: Multiple filter dimensions with URL query params
- **Accessibility**: Keyboard navigation, ARIA labels, screen reader support

## Features Implemented

### 1. KnowledgeOverview Page (`/knowledge`)

- **Responsive Grid Layout**: Cards displayed in 1-3 column grid (mobile to desktop)
- **Card Preview Tiles** showing:
  - Title (Chinese & English)
  - Category badge (理论/框架/透镜/方法)
  - Difficulty badge (基础/进阶/拓展)
  - Summary text
  - Tags
  - Favorite & studied status icons

### 2. Detail View Dialog

Expandable modal with tabbed content:

- **核心概念 (Core Concept)**: Summary, core idea, optional media
- **案例 (Examples)**: Numbered list of practical examples
- **应用技巧 (Application Tips)**: Actionable tips with lightbulb icons
- **资源 (Resources)**: Recommended readings and related cards

Actions:

- Toggle favorite (heart icon)
- Toggle studied status (checkmark icon)
- Navigate to related cards

### 3. Relationship Visualization

Interactive SVG radial graph:

- **Nodes**: Cards positioned in a circle
- **Edges**: Lines connecting related cards
  - Solid lines: Direct relationships
  - Dashed lines: Related topics
  - Arrows: Prerequisite relationships
- **Interactions**:
  - Click to select and view details
  - Hover to preview connections
  - Highlights related nodes
- **Legend**: Visual guide for relationship types
- **Info Panel**: Shows selected card details and connections

### 4. Filtering & Sorting

**Filter Dimensions**:

- Category tabs (全部/理论/框架/透镜/方法)
- Difficulty dropdown (全部/基础/进阶/拓展)
- Status dropdown (全部/已收藏/已学习/未学习)

**Sorting Options**:

- Default (data order)
- By title (Chinese locale sort)
- By difficulty (base → advance → stretch)
- By category (alphabetical)

**URL State Management**: All filters persist in URL query parameters for sharing and bookmarking

### 5. View Modes

- **Grid View** (default): Card grid with previews
- **Graph View**: Relationship visualization
- Toggle buttons with icons

### 6. Progress/Favorite System

- **State Storage**: localStorage (simulates backend)
- **Toggle Actions**: Click heart/check icons in cards or detail view
- **Visual Indicators**:
  - Filled red heart for favorites
  - Green checkmark for studied
  - "✓ 已学习" badge in detail view

## Content (8 Knowledge Cards)

1. **康定斯基：点线面** (Kandinsky: Point, Line, Plane) - Theory, Base
2. **包豪斯设计原则** (Bauhaus Design Principles) - Theory, Base
3. **工作流透镜：形态** (Workflow Lens: Form) - Lens, Base
4. **工作流透镜：功能** (Workflow Lens: Function) - Lens, Base
5. **工作流透镜：空间** (Workflow Lens: Space) - Lens, Advance
6. **工作流透镜：用户** (Workflow Lens: User) - Lens, Advance
7. **工作流透镜：语境** (Workflow Lens: Context) - Lens, Advance
8. **扬·盖尔：建筑之间的生活** (Jan Gehl: Life Between Buildings) - Framework, Advance
9. **格式塔原理** (Gestalt Principles) - Theory, Base

Each card includes:

- Chinese & English titles
- Category and difficulty
- Comprehensive summary
- Core concept explanation
- 4+ practical examples
- 4+ application tips
- 2-3 recommended readings (with authors/URLs)
- Related card connections
- 3-4 descriptive tags

## Card Relationships (10 connections)

- Prerequisite relationships (foundational knowledge)
- Related topics (complementary concepts)
- Application relationships (theory to practice)

Examples:

- Kandinsky → Form Lens (application)
- Kandinsky ↔ Bauhaus (related)
- Form Lens → Space Lens (prerequisite)
- User Lens → Jan Gehl (related)

## Accessibility Features

### Keyboard Navigation

- Tab to navigate between cards and controls
- Enter/Space to activate cards and buttons
- Arrow keys supported in graph (future enhancement)
- Focus visible styles on all interactive elements

### ARIA Support

- `role="button"` on card elements
- `aria-label` on icon buttons (心, ✓)
- `aria-label="知识卡片关系图谱"` on SVG graph
- Descriptive text alternatives for screen readers

### Visual Accessibility

- High contrast focus rings (2px ring with offset)
- Color is never the only differentiator
- Text labels accompany all icons
- Sufficient color contrast ratios

### Responsive Design

- Mobile-first approach
- Touch-friendly targets (min 44×44px)
- Readable font sizes at all breakpoints
- No horizontal scroll at 360px+

## Technical Stack

### Frontend

- **React 18.3**: Component framework
- **TypeScript**: Type safety
- **Wouter**: Lightweight routing
- **Framer Motion**: Smooth animations in graph
- **Tailwind CSS 4**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library

### UI Components (shadcn/ui)

- Badge, Button, Card
- Dialog (modal detail view)
- Tabs, Select (filters)
- All components follow shadcn conventions

### State Management

- React hooks (useState, useMemo, useCallback, useEffect)
- Custom hook: `useKnowledgeCards`
- localStorage for persistence
- URL query params for filters

### Data Structure

```typescript
interface KnowledgeCard {
  id: string;
  title: string;
  titleEn?: string;
  category: "theory" | "framework" | "lens" | "method";
  difficulty: "base" | "advance" | "stretch";
  summary: string;
  coreIdea: string;
  examples: string[];
  applicationTips: string[];
  recommendedReadings: Array<{
    title: string;
    author?: string;
    url?: string;
  }>;
  relatedCards: string[];
  mediaUrl?: string;
  tags: string[];
}
```

## File Structure

```
client/src/
├── components/
│   ├── ui/                     # shadcn components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── difficulty-badge.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   └── index.ts
│   ├── knowledge-card-detail.tsx  # Detail modal
│   └── knowledge-graph.tsx        # Relationship visualization
├── pages/
│   ├── home.tsx                # Landing page
│   └── knowledge-overview.tsx  # Main knowledge page
├── hooks/
│   └── use-knowledge-cards.ts  # Data & state hook
├── lib/
│   └── utils.ts                # cn() helper
├── App.tsx                     # Router
├── main.tsx                    # Entry point
└── index.css                   # Global styles

shared/
├── types.ts                    # TypeScript interfaces
└── knowledge-data.ts           # Card content & relationships
```

## Future Enhancements

- [ ] Backend API integration (currently localStorage)
- [ ] Search functionality
- [ ] Card comments/notes
- [ ] Learning path recommendations
- [ ] Export/share functionality
- [ ] Card completion tracking
- [ ] Animated transitions between views
- [ ] More sophisticated graph layouts (force-directed)
- [ ] Card versioning and history

## Testing Checklist

- [x] All cards load correctly
- [x] Filters work independently and in combination
- [x] Sort options work correctly
- [x] URL state persists and can be shared
- [x] Favorite/studied toggles persist in localStorage
- [x] Detail modal opens and closes properly
- [x] Related card navigation works
- [x] Graph visualization renders correctly
- [x] Graph interactions (click, hover) work
- [x] Keyboard navigation functional
- [x] Responsive on mobile (360px+)
- [x] No console errors
- [x] Type checking passes
- [x] Prettier formatting applied

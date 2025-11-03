# Knowledge Cards Feature

## Overview

The Knowledge Cards system provides an interactive learning experience for design theory, featuring:

- **9 comprehensive cards** covering Kandinsky, Bauhaus, 5 Workflow Lenses, Jan Gehl, and Gestalt principles
- **Expandable detail views** with structured content (core ideas, examples, tips, resources)
- **Interactive relationship graph** showing connections between concepts
- **Persistent state** for favorites and study progress
- **Advanced filtering** by category, difficulty, and completion status
- **URL-based state** for shareable filtered views

## Routes

- `/` - Home page with navigation
- `/knowledge` - Knowledge cards overview with filtering and graph visualization

## Components

### KnowledgeOverview (`knowledge-overview.tsx`)

Main page component with:

- Grid/Graph view toggle
- Category tabs (理论/框架/透镜/方法)
- Difficulty, status, and sort filters
- Card grid display
- Relationship graph visualization

### KnowledgeCardDetail (`../components/knowledge-card-detail.tsx`)

Modal dialog with:

- Tabbed content (核心概念/案例/应用技巧/资源)
- Favorite/studied toggles
- Related card navigation
- Rich content display

### KnowledgeGraph (`../components/knowledge-graph.tsx`)

SVG-based visualization with:

- Radial node layout
- Relationship edges (solid/dashed/arrows)
- Interactive hover/click
- Legend and info panel

## Data Hook (`../hooks/use-knowledge-cards.ts`)

Custom hook providing:

- Card data loading
- Relationship data
- User state management (favorites, studied)
- Toggle functions
- localStorage persistence

## Usage

```tsx
import { KnowledgeOverview } from "./pages/knowledge-overview";

// In router
<Route path="/knowledge" component={KnowledgeOverview} />;
```

## Accessibility

- Full keyboard navigation (Tab, Enter, Space)
- ARIA labels on all interactive elements
- Screen reader support for graph
- High contrast focus states
- Mobile responsive (360px+)

## URL Parameters

- `?category=theory` - Filter by category
- `?difficulty=base` - Filter by difficulty
- `?status=favorite` - Filter by status
- `?sort=title` - Sort cards
- `?view=graph` - Switch to graph view

# 数字设计构成 | Digital Design Composition

跨学科设计教育平台 - 探索构成原理在建筑、平面、产品、城市规划和数字媒体领域的应用

## Features

- 📚 **案例库 Case Library**: Browse and explore design cases across 5 professional domains
- 🔍 **智能搜索 Smart Search**: Search cases by title, tags, description with debounced input
- 🎯 **多维筛选 Multi-dimensional Filters**: Filter by discipline, difficulty level, and tags
- ❤️ **收藏功能 Favorites**: Save favorite cases for quick access
- 📱 **响应式设计 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🎨 **深色模式 Dark Mode**: Automatic dark/light theme based on system preferences
- ⚡ **性能优化 Performance**: Lazy-loaded images, client-side filtering, and React Query caching
- 🔗 **分享功能 Sharing**: Share and copy case links with URL state management

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite 7
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: Wouter
- **Backend**: Express.js (Node.js)
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ or npm/pnpm

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps
```

### Development

Run both the frontend and backend servers:

```bash
# Terminal 1: Start the backend server (port 3001)
npm run dev:server

# Terminal 2: Start the frontend dev server (port 3000)
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
# Build both frontend and backend
npm run build

# Start the production server
npm start
```

### Other Commands

```bash
# Type checking
npm run check

# Code formatting
npm run format
```

## Project Structure

```
.
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ui/       # shadcn/ui components
│   │   │   ├── case-card.tsx
│   │   │   ├── case-detail-modal.tsx
│   │   │   └── case-filters.tsx
│   │   ├── pages/        # Route pages
│   │   │   └── cases.tsx
│   │   ├── lib/          # Utilities
│   │   ├── hooks/        # Custom React hooks
│   │   ├── App.tsx       # Main app component
│   │   ├── main.tsx      # Entry point
│   │   └── index.css     # Global styles
│   └── index.html         # HTML template
├── server/                # Backend API
│   └── index.ts          # Express server
├── shared/               # Shared code between client/server
│   ├── types.ts         # TypeScript types
│   └── mock-data.ts     # Mock case data
└── package.json

```

## Case Library Features

### Filtering & Search

- **Disciplines**: 建筑设计, 平面设计, 产品设计, 城市规划, 数字媒体
- **Difficulty Levels**: 基础 (Base), 进阶 (Advance), 挑战 (Stretch)
- **Tags**: Multiple tags per case for fine-grained filtering
- **Search**: Real-time search with 300ms debounce

### Case Details

Each case includes:

- **核心洞察 Key Insight**: Main design insight
- **问题描述 Problem Description**: Context and challenge
- **解构分析 Deconstruction Analysis**: Design analysis using composition principles
- **解决方案 Solution**: Design solution and approach
- **参考资料 References**: Links to articles, books, videos, and websites
- **相关知识卡片 Related Knowledge**: Connected learning topics

### URL State Management

Filters and search queries are synced to the URL, allowing:

- Shareable links with specific filters applied
- Direct links to individual cases
- Browser back/forward navigation

## API Endpoints

### GET `/api/cases`

Query parameters:

- `search`: Search query string
- `disciplines`: Comma-separated discipline IDs
- `tags`: Comma-separated tags
- `difficulty`: Comma-separated difficulty levels
- `favorites`: "true" to show only favorited cases

### POST `/api/cases/:id/favorite`

Toggle favorite status for a case.

## Design System

### Colors

- **Primary**: Deep Blue (#1E40AF) - Professionalism and academia
- **Secondary**: Orange (#F59E0B) - Creativity and vitality
- **Accent**: Responsive accent colors for light/dark modes

### Typography

- **Headings**: Noto Sans SC (思源黑体) - Modern, clear
- **Body**: Inter + Noto Sans SC - Excellent readability

### Components

- Fully accessible with ARIA labels
- Keyboard navigation support
- Focus visible states
- Screen reader friendly

## License

MIT

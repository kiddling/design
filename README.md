# 数字设计构成 - Digital Design Composition

A modern educational platform for digital design composition, built with a tri-layer architecture (client/server/shared).

## Architecture

### Tri-Layer Structure

```
project/
├── client/              # Frontend application
│   ├── index.html      # HTML entry point
│   └── src/
│       ├── main.tsx    # React entry with providers
│       ├── App.tsx     # Main app with routing
│       ├── index.css   # Global styles and Tailwind
│       ├── env.d.ts    # Vite environment types
│       ├── components/ # React components
│       │   └── ui/     # shadcn/ui components
│       ├── pages/      # Route pages
│       ├── lib/        # Utilities
│       └── hooks/      # Custom hooks
├── server/             # Backend application
│   └── index.ts        # Express server
└── shared/             # Shared code
    └── types.ts        # Shared TypeScript types
```

## Tech Stack

- **Frontend**: React 18, TypeScript 5.6, Vite 7, Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: Wouter
- **Data Fetching**: TanStack Query v4
- **Backend**: Express 4, Node.js
- **Dev Tools**: tsx, npm-run-all

## Getting Started

### Installation

```bash
npm install --legacy-peer-deps
```

Note: `--legacy-peer-deps` flag is required due to Vite 7 peer dependency conflicts.

### Development

Start both client and server in parallel:

```bash
npm run dev
```

This will start:
- Vite dev server at `http://localhost:3000` (client)
- Express API server at `http://localhost:5000` (server)

Or run individually:

```bash
npm run dev:client  # Vite only
npm run dev:server  # Express only
```

### Production Build

```bash
npm run build
```

Outputs:
- Client: `dist/public/`
- Server: `dist/server/`

Start production server:

```bash
npm start
```

### Type Checking

```bash
npm run check
```

### Code Formatting

```bash
npm run format
```

## Routes

- `/` - Home page
- `/courses/:id` - Course detail
- `/knowledge` - Knowledge cards
- `/cases` - Case library
- `/ai-tools` - AI tools
- `/workflow` - Workflow guide
- `/resources` - Learning resources
- `/assignments` - Assignments

## Path Aliases

- `@/*` → `client/src/*`
- `@client/*` → `client/*`
- `@server/*` → `server/*`
- `@shared/*` → `shared/*`

## Adding UI Components

Use shadcn CLI to add components:

```bash
npx shadcn@latest add [component-name]
```

Components are added to `client/src/components/ui/`.

## API Endpoints

- `GET /api/health` - Health check endpoint

## Design System

- **Primary Color**: Deep Blue (#1E40AF)
- **Accent Color**: Orange (#F59E0B)
- **Fonts**: Inter + Noto Sans SC (思源黑体)
- **Theme**: Dark/Light mode support with CSS variables

## Development Notes

### Tailwind CSS 4

- Use `@import "tailwindcss"` in CSS files
- Cannot use custom utilities in `@apply` directive
- Use CSS custom properties directly: `background-color: hsl(var(--background))`

### Shared Types

Define shared types in `shared/types.ts` for use in both client and server:

```typescript
import type { DifficultyLevel } from "@shared/types";
```

### Server Configuration

The Express server is configured with:
- JSON and URL-encoded body parsing
- CORS enabled for all origins
- Health check endpoint
- Static file serving in production
- SPA fallback routing

## License

MIT

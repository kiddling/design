# Digital Design Composition

A progressive web application for digital design education, built with React 18, TypeScript, Vite, and Express.

## Features

- 🎯 **Course Management**: 12-week curriculum with progressive lessons
- 📚 **Knowledge Cards**: Flashcards for design concepts and theory
- 📖 **Case Library**: Filterable gallery of design exemplars
- 🤖 **Prompt Studio**: AI prompt editor for generative design
- 📝 **Assignments**: Project submission and feedback system

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library
- **Wouter** for lightweight routing
- **TanStack Query** for data fetching
- **Framer Motion** for animations

### Backend
- **Express** server
- **esbuild** for server bundling
- TypeScript with ESM

### Testing & Quality
- **Vitest** for unit/integration tests
- **Testing Library** for component testing
- **Supertest** for API testing
- **Axe** for accessibility auditing (dev only)
- **Web Vitals** for performance monitoring

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+

### Installation

\`\`\`bash
# Install dependencies
pnpm install

# Copy environment file (if needed)
cp .env.example .env
\`\`\`

### Development

\`\`\`bash
# Start dev server (Vite on port 3000)
pnpm dev

# Type-check without emitting
pnpm check

# Format code
pnpm format
\`\`\`

The dev server includes:
- Hot module replacement (HMR)
- Automatic accessibility auditing with axe-core
- React Query DevTools

### Testing

\`\`\`bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
\`\`\`

**Coverage targets**: ≥80% statements, ≥75% branches, ≥80% functions, ≥80% lines

### Building for Production

\`\`\`bash
# Build client and server
pnpm build

# Start production server
pnpm start
\`\`\`

Build output:
- Client bundle: \`dist/public/\`
- Server bundle: \`dist/index.js\`

## Project Structure

\`\`\`
.
├── client/
│   ├── index.html
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level components (lazy-loaded)
│       ├── hooks/           # Custom React hooks
│       ├── lib/             # Utilities (analytics, utils)
│       ├── test/            # Test setup files
│       ├── App.tsx          # Root component with routing
│       ├── main.tsx         # Entry point
│       └── styles.css       # Global styles
├── server/
│   └── index.ts             # Express server with API routes
├── shared/
│   ├── types.ts             # Shared TypeScript types
│   └── data.ts              # Mock/seed data
├── tests/
│   ├── components/          # Component tests
│   └── server.test.ts       # API tests
└── ...config files
\`\`\`

## Performance Optimizations

### Implemented
- ✅ Route-level code splitting with \`React.lazy\`
- ✅ Suspense boundaries for async components
- ✅ Skeleton loaders for perceived performance
- ✅ Image lazy-loading via \`loading="lazy"\`
- ✅ Data prefetching on hover/focus (TanStack Query)
- ✅ Web Vitals monitoring (CLS, FCP, FID, INP, LCP, TTFB)

### Bundle Analysis

\`\`\`bash
# Analyze bundle size
pnpm build --stats
npx vite-bundle-visualizer
\`\`\`

**Target**: Lighthouse score ≥90 on desktop/mobile for key pages

## Accessibility

### Standards
- WCAG 2.1 AA compliance
- Semantic HTML5 landmarks
- ARIA roles and labels
- Keyboard navigation (Tab, Enter, Escape)
- Skip links for main content
- Focus indicators (3px solid outline)

### Auditing

\`\`\`bash
# Dev mode automatically runs axe-core
pnpm dev

# Manual audit (requires Lighthouse CLI)
npm i -g @lhci/cli
lhci autorun
\`\`\`

**Critical issues**: Must be resolved before production

## Testing Strategy

### Component Tests
- Skeleton loaders (rendering, accessibility)
- Navigation (routing, active states)
- Error boundaries (error handling)

### Integration Tests
- Course detail flow (data fetching, display)
- Prompt editor interactions
- Assignment form validation

### API Tests (Supertest)
- Course outline endpoint
- Course detail endpoint
- Analytics endpoints

### E2E Tests (Future)
- Playwright for smoke tests
- Responsive breakpoints (mobile, tablet, desktop)

## Scripts Reference

| Script | Description |
|--------|-------------|
| \`pnpm dev\` | Start Vite dev server |
| \`pnpm build\` | Build client + server for production |
| \`pnpm start\` | Run production server |
| \`pnpm preview\` | Preview production build locally |
| \`pnpm check\` | Type-check all TypeScript files |
| \`pnpm format\` | Format code with Prettier |
| \`pnpm test\` | Run all tests |
| \`pnpm test:watch\` | Run tests in watch mode |
| \`pnpm test:coverage\` | Generate coverage report |

## Environment Variables

\`\`\`bash
# .env
PORT=3001                      # Server port
NODE_ENV=development           # Environment (development|production|test)
VITE_API_BASE_URL=/api         # API base URL for client
\`\`\`

## Known Limitations

1. **Authentication**: No user login/session management yet
2. **Database**: Mock data only; no persistence layer
3. **File Uploads**: Assignment submissions are URL-based
4. **Internationalization**: Chinese/English content mixed; no i18n framework
5. **Analytics**: Web Vitals logged but not aggregated/visualized
6. **Offline Support**: No service worker or PWA manifest

## CI/CD

### GitHub Actions Workflow

Create \`.github/workflows/ci.yml\`:

\`\`\`yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm check
      - run: pnpm test:coverage
      - run: pnpm build
\`\`\`

### Pre-commit Hooks (Optional)

\`\`\`bash
# Install husky
pnpm add -D husky lint-staged

# Initialize
npx husky init

# Add pre-commit hook
echo "pnpm check && pnpm format" > .husky/pre-commit
\`\`\`

## Contributing

1. **Fork** the repository
2. **Create** a feature branch (\`git checkout -b feature/amazing-feature\`)
3. **Commit** your changes (\`git commit -m 'Add amazing feature'\`)
4. **Push** to the branch (\`git push origin feature/amazing-feature\`)
5. **Open** a Pull Request

### Code Style
- Use **TypeScript** for all new files
- Follow **Prettier** formatting (auto-format on commit)
- Write **tests** for new features (≥80% coverage)
- Add **accessibility** attributes (ARIA, semantic HTML)

## License

MIT

## Support

For questions or issues, please open a GitHub issue or contact the development team.

---

**Last Updated**: 2024-11  
**Version**: 1.0.0

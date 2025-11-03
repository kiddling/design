# 数字设计构成 (Digital Design Composition)

A comprehensive design education platform with a complete UI design system.

## Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run check

# Format code
npm run format
```

## Project Structure

```
├── client/              # Frontend application
│   ├── src/
│   │   ├── components/  # UI components
│   │   │   └── ui/      # Design system components
│   │   ├── pages/       # Route pages
│   │   ├── lib/         # Utilities
│   │   ├── App.tsx      # Main app
│   │   ├── main.tsx     # Entry point
│   │   └── index.css    # Global styles
│   └── index.html       # HTML template
├── server/              # Express backend
├── shared/              # Shared types
└── public/              # Static assets
```

## Features

### Complete UI Design System

✅ **Layout Primitives**
- AppShell with navigation and mobile menu
- SectionHeader, ContentGrid, MasonryGrid
- PageBreadcrumbs for navigation

✅ **Core Components**
- Button, Card, Badge, Tabs, Accordion
- Dialog, Tooltip, Dropdown Menu
- Progress, Toggle Group

✅ **Rich Typography**
- RichText with prose styling
- QuoteCallout, Highlight, InfoBanner
- MediaFigure with captions

✅ **Utility Components**
- DifficultyBadge, StatusPill
- Timeline, Checklist, Carousel

### Theme System

- Light and dark mode support
- System preference detection
- CSS variables for easy customization
- Deep blue primary color (#1E40AF)
- Orange accent color (#F59E0B)

### Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation
- ARIA attributes
- Screen reader support
- Focus management
- Tested down to 360px width

### Developer Experience

- TypeScript for type safety
- Hot module replacement
- Fast Vite build
- Prettier formatting
- Component exports from central index

## Style Guide

Visit `/style-guide` to see all components in action with:
- Interactive examples
- Responsive behavior demonstrations
- Theme switching examples
- Usage guidelines

## Tech Stack

- **React 18.3** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **Radix UI** - Accessible primitives
- **Wouter** - Routing
- **next-themes** - Theme management
- **Lucide React** - Icons
- **Embla Carousel** - Carousels

## Documentation

See `UI_SYSTEM_IMPLEMENTATION.md` for comprehensive documentation including:
- Complete component API reference
- Usage examples
- Architecture details
- Accessibility guidelines
- Performance considerations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 8+)

## License

MIT

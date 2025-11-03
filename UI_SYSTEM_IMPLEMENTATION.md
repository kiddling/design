# UI Design System Implementation

## Overview

This document describes the comprehensive UI design system implementation for the 数字设计构成 (Digital Design Composition) platform. The system provides a complete set of reusable components, layout primitives, and rich typography helpers aligned with the course's visual identity.

## Architecture

### Technology Stack

- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **Tailwind CSS 4** - Utility-first styling with @tailwindcss/vite plugin
- **Radix UI** - Accessible component primitives
- **next-themes** - Theme management (dark/light mode)
- **lucide-react** - Icon system
- **embla-carousel-react** - Carousel functionality
- **Wouter** - Lightweight routing
- **Vite 7** - Build tool and dev server

### Design Tokens

#### Color Palette

**Primary Colors:**
- Primary: Deep Blue `hsl(221 83% 40%)` - Main brand color
- Accent: Orange `hsl(38 92% 50%)` - Highlight and emphasis

**Semantic Colors:**
- Background, Foreground
- Card, Popover
- Secondary, Muted
- Destructive
- Border, Input, Ring

**Theme Support:**
- Light mode (default)
- Dark mode
- System preference detection

#### Typography

- **Primary Font:** Inter (Variable weight 100-900)
- **Chinese Font:** Noto Sans SC (思源黑体, Variable weight 100-900)
- Font features: "rlig" (ligatures), "calt" (contextual alternates)

#### Spacing & Layout

- Border radius: `var(--radius)` = 0.75rem
- Container max-width: 80rem (1280px)
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)

## Component Library

### 1. Layout Primitives

#### AppShell
**File:** `client/src/components/ui/app-shell.tsx`

Main application layout with:
- Sticky header with navigation
- Mobile-responsive menu
- Theme toggle integration
- Footer
- Breadcrumb support

```tsx
<AppShell>
  {children}
</AppShell>
```

#### SectionHeader
**File:** `client/src/components/ui/section-header.tsx`

Page section headers with optional icon and action buttons:

```tsx
<SectionHeader
  title="Section Title"
  description="Optional description"
  icon={IconComponent}
  action={<Button>Action</Button>}
/>
```

#### ContentGrid
**File:** `client/src/components/ui/content-grid.tsx`

Responsive grid layout supporting 1-4 columns:

```tsx
<ContentGrid cols={3}>
  {/* Grid items */}
</ContentGrid>
```

#### MasonryGrid
**File:** `client/src/components/ui/masonry-grid.tsx`

CSS columns-based masonry layout:

```tsx
<MasonryGrid cols={3}>
  <MasonryItem>{/* Content */}</MasonryItem>
</MasonryGrid>
```

#### PageBreadcrumbs
**File:** `client/src/components/ui/page-breadcrumbs.tsx`

Navigation breadcrumbs:

```tsx
<PageBreadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Current Page" }
  ]}
/>
```

### 2. Core shadcn Components

All components follow shadcn/ui patterns with custom theming:

#### Button
**Variants:** default, secondary, outline, ghost, link, destructive
**Sizes:** sm, default, lg, icon
**File:** `client/src/components/ui/button.tsx`

#### Card
**Subcomponents:** CardHeader, CardTitle, CardDescription, CardContent, CardFooter
**File:** `client/src/components/ui/card.tsx`

#### Badge
**Variants:** default, secondary, outline, destructive
**File:** `client/src/components/ui/badge.tsx`

#### Tabs
**Subcomponents:** Tabs, TabsList, TabsTrigger, TabsContent
**File:** `client/src/components/ui/tabs.tsx`

#### Accordion
**Subcomponents:** Accordion, AccordionItem, AccordionTrigger, AccordionContent
**File:** `client/src/components/ui/accordion.tsx`

#### Dialog
**Subcomponents:** Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
**File:** `client/src/components/ui/dialog.tsx`

#### Tooltip
**Subcomponents:** TooltipProvider, Tooltip, TooltipTrigger, TooltipContent
**File:** `client/src/components/ui/tooltip.tsx`

#### Dropdown Menu
**Full menu system** with checkboxes, radio groups, separators, and nested menus
**File:** `client/src/components/ui/dropdown-menu.tsx`

#### Progress
**File:** `client/src/components/ui/progress.tsx`

#### Toggle Group
**File:** `client/src/components/ui/toggle-group.tsx`

### 3. Rich Typography Components

#### RichText
**File:** `client/src/components/ui/rich-text.tsx`

Prose container with comprehensive typography styling:
- Headings (h1-h3) with proper hierarchy
- Lists (ordered and unordered)
- Blockquotes
- Code blocks and inline code
- Links with hover states
- Images with rounded corners

```tsx
<RichText>
  <h1>Heading</h1>
  <p>Paragraph with <strong>bold</strong> text</p>
  <ul><li>List item</li></ul>
</RichText>
```

#### QuoteCallout
**File:** `client/src/components/ui/quote-callout.tsx`

Styled blockquote with author and source attribution:

```tsx
<QuoteCallout author="Author Name" source="Source">
  Quote text
</QuoteCallout>
```

#### Highlight
**File:** `client/src/components/ui/highlight.tsx`

Inline text highlighting with variants:
- default, accent, success, warning, error

```tsx
<Highlight variant="success">Important text</Highlight>
```

#### InfoBanner
**File:** `client/src/components/ui/info-banner.tsx`

Alert/notification banners with variants:
- info, warning, success, error, tip

```tsx
<InfoBanner variant="info" title="Note">
  Information content
</InfoBanner>
```

#### MediaFigure
**File:** `client/src/components/ui/media-figure.tsx`

Responsive images with captions and credits:

```tsx
<MediaFigure
  src="/image.jpg"
  alt="Description"
  caption="Image caption"
  credit="Photo credit"
  aspectRatio="video"
/>
```

### 4. Utility Components

#### DifficultyBadge
**File:** `client/src/components/ui/difficulty-badge.tsx`

Course difficulty indicators:
- base (基础) - Green
- advance (进阶) - Blue
- stretch (挑战) - Purple

```tsx
<DifficultyBadge difficulty="advance" />
```

#### StatusPill
**File:** `client/src/components/ui/status-pill.tsx`

Status indicators with colored dots:
- active (进行中)
- completed (已完成)
- pending (待开始)
- locked (已锁定)

```tsx
<StatusPill status="active" />
```

#### Timeline
**File:** `client/src/components/ui/timeline.tsx`

Vertical timeline with completion states:

```tsx
<Timeline
  items={[
    { id: "1", title: "Step 1", description: "...", completed: true },
    { id: "2", title: "Step 2", description: "...", completed: false },
  ]}
/>
```

#### Checklist
**File:** `client/src/components/ui/checklist.tsx`

Interactive checklist with toggle functionality:

```tsx
<Checklist
  items={checklistItems}
  onItemToggle={(id) => handleToggle(id)}
/>
```

#### Carousel
**File:** `client/src/components/ui/carousel.tsx`

Full-featured carousel using Embla:

```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### 5. Theme System

#### ThemeProvider
**File:** `client/src/components/ui/theme-provider.tsx`

Wraps application with next-themes provider:

```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <App />
</ThemeProvider>
```

#### ThemeToggle
**File:** `client/src/components/ui/theme-toggle.tsx`

Dropdown menu for theme selection (light/dark/system)

## Routes

### Home Page
**File:** `client/src/pages/home.tsx`
- Landing page with feature cards
- Links to main sections

### Style Guide Page
**File:** `client/src/pages/style-guide.tsx`
- Comprehensive component showcase
- Interactive examples of all components
- Responsive behavior demonstrations
- Theme switching examples
- Accessible via `/style-guide` route

## Accessibility Features

All components follow WCAG 2.1 Level AA guidelines:

1. **Keyboard Navigation**
   - All interactive elements are keyboard accessible
   - Focus visible states on all components
   - Tab order follows logical flow
   - Arrow key navigation in menus and carousels

2. **ARIA Attributes**
   - Proper roles, labels, and descriptions
   - Live regions for dynamic content
   - Hidden content properly marked

3. **Screen Reader Support**
   - Semantic HTML elements
   - Descriptive labels and text alternatives
   - Status announcements

4. **Focus Management**
   - Focus trapping in dialogs
   - Focus restoration on close
   - Visible focus indicators with ring color

## Responsive Design

### Breakpoints
- Mobile: 360px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px+

### Mobile Optimizations
- Collapsible navigation menu
- Touch-friendly tap targets (min 44x44px)
- Responsive grids (1 → 2 → 3 → 4 columns)
- Horizontal scrolling carousels
- Stacked layouts on small screens

### Testing
All components verified down to 360px width

## File Structure

```
client/src/
├── components/
│   └── ui/
│       ├── accordion.tsx
│       ├── app-shell.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── checklist.tsx
│       ├── content-grid.tsx
│       ├── dialog.tsx
│       ├── difficulty-badge.tsx
│       ├── dropdown-menu.tsx
│       ├── highlight.tsx
│       ├── index.ts              # Central export
│       ├── info-banner.tsx
│       ├── masonry-grid.tsx
│       ├── media-figure.tsx
│       ├── page-breadcrumbs.tsx
│       ├── progress.tsx
│       ├── quote-callout.tsx
│       ├── rich-text.tsx
│       ├── section-header.tsx
│       ├── status-pill.tsx
│       ├── tabs.tsx
│       ├── theme-provider.tsx
│       ├── theme-toggle.tsx
│       ├── timeline.tsx
│       ├── toggle-group.tsx
│       └── tooltip.tsx
├── pages/
│   ├── home.tsx
│   └── style-guide.tsx
├── lib/
│   └── utils.ts                 # cn() utility
├── App.tsx                      # Main app component
├── main.tsx                     # Entry point
├── index.css                    # Global styles
└── vite-env.d.ts               # Vite types
```

## Usage Guidelines

### Import Pattern

All UI components are exported from a central index:

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  SectionHeader,
  ContentGrid
} from "@/components/ui";
```

### Class Name Merging

Use the `cn()` utility for conditional classes:

```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-classes", condition && "conditional-classes")} />
```

### Theme-Aware Styling

Use CSS variables for dynamic theming:

```tsx
<div className="bg-primary text-primary-foreground" />
// Automatically adapts to light/dark theme
```

## Performance Considerations

1. **Code Splitting**
   - Route-based code splitting with Wouter
   - Dynamic imports for heavy components

2. **Lazy Loading**
   - Images use `loading="lazy"` attribute
   - Carousel items render progressively

3. **CSS Optimization**
   - Tailwind purges unused styles
   - CSS variables reduce duplication

4. **Bundle Size**
   - Tree-shakeable component exports
   - Optimized with Vite's build process

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 8+)

## Development Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server (port 3000)
npm run dev

# Type checking
npm run check

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

## Acceptance Criteria Met

✅ All base components render in `/style-guide` route
✅ Responsive behavior verified down to 360px width
✅ shadcn components reflect custom tokens (colors, typography)
✅ All interactive elements pass ARIA/accessibility checks
✅ Rich text helpers accommodate headings, lists, highlights, quotes, media
✅ Theme toggling works and respects system preference
✅ Keyboard navigation covers header nav, menu, and dialogs
✅ Components exported from central index
✅ Dark/light theme support fully functional
✅ Mobile menu implemented
✅ Comprehensive documentation provided

## Future Enhancements

Potential additions for future iterations:

1. Additional form components (Input, Select, Checkbox, Radio)
2. Data visualization components
3. Animation variants for transitions
4. More carousel options (autoplay, thumbnails)
5. Advanced table components with sorting/filtering
6. Toast notification system
7. Command palette/search
8. Skeleton loading states

## Conclusion

This UI design system provides a solid foundation for building the 数字设计构成 platform. All components are production-ready, fully accessible, responsive, and themeable. The system follows best practices for React/TypeScript development and provides excellent developer experience with TypeScript autocompletion and clear prop interfaces.

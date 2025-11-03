# Course Module Implementation

## Overview

This implementation delivers the "观·元素解构" (Observing & Deconstructing Elements) course page with structured sections, rich formatting, workflow visualization, and responsive layout, consuming backend data.

## Features Implemented

### 1. Course Data Structure
- **Location**: `shared/types/course.ts`, `shared/data/courses.ts`
- Comprehensive type definitions for courses, sections, and content blocks
- Support for multiple content types: text, images, quotes, callouts, lists, tabs, timelines, and card grids
- Rich course data for "观·元素解构" with 6 sections:
  - Course Goals (课程目标)
  - Theory Spotlight (理论聚焦) - Kandinsky and Bauhaus theories
  - Workflow Timeline (学习工作流) - 5-step design thinking process
  - Extended Reading (拓展阅读) - Classics and contemporary resources
  - Assignments (作业要求) - Requirements and grading criteria
  - Resources (学习资源) - Tools and learning materials

### 2. Backend API
- **Location**: `server/index.ts`
- RESTful endpoints:
  - `GET /api/courses` - List all courses
  - `GET /api/courses/:id` - Get specific course
  - `GET /api/courses/:courseId/progress` - Get user progress
  - `POST /api/courses/:courseId/progress` - Update user progress
- In-memory progress storage (can be replaced with database)
- CORS-enabled for development

### 3. Frontend Components

#### UI Components (`client/src/components/ui/`)
- **Button**: Versatile button with variants (default, destructive, outline, secondary, ghost, link)
- **Tabs**: Radix UI tabs for organizing content
- **Progress**: Progress bar for tracking course completion
- **Card**: Card layouts for grid displays
- **Badge**: Tags and labels for metadata
- **Checkbox**: For marking sections as complete
- **Select**: Dropdown for mobile navigation
- **Toaster**: Toast notifications using Sonner

#### Course-Specific Components (`client/src/components/course/`)

**RichText Component** (`RichText.tsx`)
- Renders all content block types dynamically
- Supports:
  - Text blocks with different formats (heading, subheading, paragraph)
  - Images with lazy loading and captions
  - Quote blocks with author attribution
  - Callout boxes with variants (info, warning, success, tip)
  - Ordered and unordered lists
  - Interactive tabs for organizing nested content
  - Animated timeline with icons using Framer Motion
  - Responsive card grids with configurable columns

**Course Navigation** (`CourseNavigation.tsx`)
- Desktop: Sticky sidebar navigation with active state highlighting
- Mobile: Dropdown select menu for section navigation
- Smooth scrolling to sections
- Automatically updates active section based on scroll position

### 4. Course Page (`client/src/routes/courses/[id].tsx`)

#### Hero Section
- Course title with subtitle
- Description and objectives
- Duration and metadata (level, tags)
- Visual progress bar showing completion percentage
- Learning objectives list

#### Section Management
- Dynamic rendering of all course sections
- Intersection Observer for scroll-based active section tracking
- Section completion checkboxes with real-time progress updates
- Toast notifications for progress saves

#### Progress Tracking
- Persists completion state via backend API
- Real-time progress bar updates
- Section-by-section completion tracking
- Automatic progress percentage calculation

#### Responsive Design
- Mobile-first approach
- Breakpoints: 360px (mobile), 768px (tablet), 1280px (desktop)
- Collapsible navigation on mobile
- Stacked layouts on smaller screens
- Lazy-loaded images for performance

#### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- Focus management for modals and overlays

#### SEO Support
- Dynamic document title per course
- Meta description injection
- Semantic heading hierarchy
- Structured content for crawlers

### 5. Routing & State Management
- Wouter for lightweight routing
- React Query for server state management:
  - Automatic caching
  - Background refetching
  - Optimistic updates
  - Error handling
- Dynamic route parameters for course IDs

### 6. API Integration
- **Location**: `client/src/lib/api.ts`
- Axios-based API client
- Environment-aware base URL (dev/prod)
- Type-safe API calls with TypeScript
- Centralized error handling

## File Structure

```
project/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   └── course/       # Course-specific components
│   │   ├── routes/
│   │   │   ├── home.tsx      # Home page with course list
│   │   │   └── courses/
│   │   │       └── [id].tsx  # Dynamic course page
│   │   ├── lib/
│   │   │   ├── api.ts        # API client
│   │   │   └── utils.ts      # Utility functions
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles with Tailwind
│   └── index.html            # HTML template
├── server/
│   └── index.ts              # Express backend
├── shared/
│   ├── types/
│   │   └── course.ts         # Shared TypeScript types
│   └── data/
│       └── courses.ts        # Course data
└── tailwind.config.ts        # Tailwind configuration
```

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **State Management**: TanStack React Query v4
- **Routing**: Wouter
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Backend**: Express.js
- **Notifications**: Sonner

## Running the Application

### Development Mode

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the backend server:
   ```bash
   npx tsx server/index.ts
   ```

3. Start the frontend dev server:
   ```bash
   pnpm dev
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

### Production Build

```bash
pnpm build
pnpm start
```

## Key Features Checklist

- ✅ Course page loads data from API
- ✅ All content blocks render correctly
- ✅ Section quick navigation (desktop sticky nav + mobile select)
- ✅ Active state updates on scroll
- ✅ Progress tracking persists via backend
- ✅ Real-time progress indicator with toast feedback
- ✅ Responsive design (360px, 768px, 1280px tested)
- ✅ ARIA labels for accessibility
- ✅ SEO meta tags (title, description)
- ✅ Lazy-loaded images
- ✅ Smooth scrolling
- ✅ Hero section with objectives and metadata
- ✅ Rich content formatting (quotes, callouts, tabs, timelines)
- ✅ Interactive elements (checkboxes, tabs, cards)
- ✅ Animated workflow visualization
- ✅ Type-safe API integration

## Future Enhancements

1. **Database Integration**: Replace in-memory storage with PostgreSQL/MongoDB
2. **User Authentication**: Add user accounts and session management
3. **Image Optimization**: Implement image CDN and responsive images
4. **Interactive Exercises**: Add quizzes and hands-on activities
5. **Comments/Discussion**: Enable peer interaction on course content
6. **Bookmarking**: Allow users to save favorite sections
7. **Notes Feature**: Let users take and save notes
8. **Course Certificates**: Generate completion certificates
9. **Analytics**: Track user engagement and learning patterns
10. **Multi-language Support**: Add internationalization (i18n)

## Notes

- The course data is currently hardcoded in `shared/data/courses.ts` but follows a structured format that can easily be migrated to a database
- Progress tracking uses simple in-memory storage; production should use persistent storage
- The implementation follows React best practices and TypeScript strict mode
- All components are designed to be reusable and maintainable

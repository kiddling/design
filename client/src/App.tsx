import { Suspense, lazy } from "react";
import { Route, Router } from "wouter";
import { Navigation } from "@/components/Navigation";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CardSkeleton } from "@/components/Skeleton";

const Home = lazy(() => import("@/pages/Home"));
const Courses = lazy(() => import("@/pages/Courses"));
const CourseDetail = lazy(() => import("@/pages/CourseDetail"));
const Knowledge = lazy(() => import("@/pages/Knowledge"));
const Cases = lazy(() => import("@/pages/Cases"));
const Prompts = lazy(() => import("@/pages/Prompts"));
const Assignments = lazy(() => import("@/pages/Assignments"));

function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <SkipLink />
        <header role="banner">
          <div className="container header-content">
            <h1 className="app-title">Digital Design Composition</h1>
            <Navigation />
          </div>
        </header>

        <main id="main-content" role="main" tabIndex={-1}>
          <Suspense fallback={<CardSkeleton />}>
            <Route path="/" component={Home} />
            <Route path="/courses" component={Courses} />
            <Route path="/knowledge" component={Knowledge} />
            <Route path="/cases" component={Cases} />
            <Route path="/prompts" component={Prompts} />
            <Route path="/assignments" component={Assignments} />
            <Route path="/courses/:id" component={CourseDetail} />
          </Suspense>
        </main>

        <footer role="contentinfo">
          <div className="container">
            <p>&copy; 2024 Digital Design Composition</p>
          </div>
        </footer>
      </Router>
    </ErrorBoundary>
  );
}

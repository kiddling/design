import { Route, Switch, Link } from "wouter";
import HomePage from "./pages/home";
import CourseDetailPage from "./pages/course-detail";
import KnowledgePage from "./pages/knowledge";
import CasesPage from "./pages/cases";
import AIToolsPage from "./pages/ai-tools";
import WorkflowPage from "./pages/workflow";
import ResourcesPage from "./pages/resources";
import AssignmentsPage from "./pages/assignments";

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="text-xl font-bold text-primary">数字设计构成</a>
            </Link>
            <div className="flex gap-4">
              <Link href="/knowledge">
                <a className="text-sm hover:text-primary transition-colors">
                  知识卡片
                </a>
              </Link>
              <Link href="/cases">
                <a className="text-sm hover:text-primary transition-colors">
                  案例库
                </a>
              </Link>
              <Link href="/ai-tools">
                <a className="text-sm hover:text-primary transition-colors">
                  AI工具箱
                </a>
              </Link>
              <Link href="/workflow">
                <a className="text-sm hover:text-primary transition-colors">
                  工作流
                </a>
              </Link>
              <Link href="/resources">
                <a className="text-sm hover:text-primary transition-colors">
                  学习资源
                </a>
              </Link>
              <Link href="/assignments">
                <a className="text-sm hover:text-primary transition-colors">
                  作业
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 数字设计构成 Digital Design Composition
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppShell>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/courses/:id" component={CourseDetailPage} />
        <Route path="/knowledge" component={KnowledgePage} />
        <Route path="/cases" component={CasesPage} />
        <Route path="/ai-tools" component={AIToolsPage} />
        <Route path="/workflow" component={WorkflowPage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/assignments" component={AssignmentsPage} />
        <Route>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold">404 - 页面未找到</h1>
          </div>
        </Route>
      </Switch>
    </AppShell>
  );
}

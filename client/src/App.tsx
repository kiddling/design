import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import CoursePage from "@/routes/courses/[id]";
import HomePage from "@/routes/home";
import WorkflowPage from "@/routes/workflow";
import KnowledgePage from "@/routes/knowledge";
import CasesPage from "@/routes/cases";
import AIToolsPage from "@/routes/ai-tools";
import ResourcesPage from "@/routes/resources";
import AssignmentsPage from "@/routes/assignments";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/courses/:id" component={CoursePage} />
        <Route path="/workflow" component={WorkflowPage} />
        <Route path="/knowledge" component={KnowledgePage} />
        <Route path="/cases" component={CasesPage} />
        <Route path="/ai-tools" component={AIToolsPage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/assignments" component={AssignmentsPage} />
        <Route>
          {() => (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-muted-foreground">页面未找到</p>
              </div>
            </div>
          )}
        </Route>
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

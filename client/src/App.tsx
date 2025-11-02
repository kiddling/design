import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CasesPage } from "./pages/cases";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/cases" component={CasesPage} />
        <Route path="/">
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                数字设计构成 Digital Design Composition
              </h1>
              <p className="text-muted-foreground mb-8">跨学科设计教育平台</p>
              <a
                href="/cases"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                浏览案例库
              </a>
            </div>
          </div>
        </Route>
      </Switch>
    </QueryClientProvider>
  );
}

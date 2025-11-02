import { Route, Switch } from "wouter";
import { Home } from "./pages/home";
import { KnowledgeOverview } from "./pages/knowledge-overview";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/knowledge" component={KnowledgeOverview} />
      <Route>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-muted-foreground mb-4">页面未找到</p>
            <a href="/" className="text-primary hover:underline">
              返回首页
            </a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

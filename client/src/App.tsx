import { Route, Switch } from "wouter";
import { Resources } from "@/pages/Resources";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Switch>
        <Route path="/resources" component={Resources} />
        <Route path="/">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">数字设计构成</h1>
            <p className="text-muted-foreground mb-4">
              欢迎来到数字设计构成学习平台
            </p>
            <a href="/resources" className="text-primary hover:underline">
              前往学习资源库 →
            </a>
          </div>
        </Route>
        <Route>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-muted-foreground">页面未找到</p>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

import { Route, Switch } from "wouter";
import { AIToolsPage } from "@/pages/AIToolsPage";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/ai-tools" component={AIToolsPage} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">数字设计构成</h1>
        <p className="text-muted-foreground">欢迎来到数字设计构成教学平台</p>
        <div className="pt-4">
          <a
            href="/ai-tools"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8"
          >
            进入AI工具箱
          </a>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">页面未找到</p>
        <div className="pt-4">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;

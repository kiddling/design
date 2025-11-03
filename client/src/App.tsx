import { Route, Switch } from "wouter";
import { AppShell } from "@/components/ui/app-shell";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/home";
import StyleGuidePage from "@/pages/style-guide";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AppShell>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/style-guide" component={StyleGuidePage} />
            <Route>
              {() => (
                <div className="container-responsive py-20 text-center">
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-muted-foreground">页面未找到</p>
                </div>
              )}
            </Route>
          </Switch>
        </AppShell>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;

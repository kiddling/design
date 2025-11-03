import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router, Route, Switch } from "wouter";

import AppLayout from "./pages/AppLayout";
import AssignmentsPage from "./pages/AssignmentsPage";
import AssignmentDetailPage from "./pages/AssignmentDetailPage";
import "./styles/global.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Router>
      <AppLayout>
        <Switch>
          <Route path="/" component={AssignmentsPage} />
          <Route path="/assignments" component={AssignmentsPage} />
          <Route path="/assignments/:assignmentId" component={AssignmentDetailPage} />
        </Switch>
      </AppLayout>
    </Router>
  </StrictMode>
);

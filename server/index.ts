import express, { type Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import type { HealthResponse } from "@shared/types";

// Middleware
import { requestLogger } from "./middleware/logger";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { apiLimiter, submissionLimiter } from "./middleware/rateLimiter";

// Routers
import coursesRouter from "./routes/courses";
import knowledgeRouter from "./routes/knowledge";
import casesRouter from "./routes/cases";
import promptsRouter from "./routes/prompts";
import workflowsRouter from "./routes/workflows";
import resourcesRouter from "./routes/resources";
import assignmentsRouter from "./routes/assignments";
import usersRouter from "./routes/users";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createServer() {
  const app = express();

  // Basic middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Logging
  app.use(requestLogger);

  // CORS - allow Vite dev server
  app.use((req, res, next) => {
    const origin = req.headers.origin || "*";
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Health check route
  app.get("/api/health", (_req: Request, res: Response) => {
    const response: HealthResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
    res.json(response);
  });

  // Apply rate limiter to all API routes
  app.use("/api", apiLimiter);

  // Content API routes
  app.use("/api/courses", coursesRouter);
  app.use("/api/knowledge", knowledgeRouter);
  app.use("/api/cases", casesRouter);
  app.use("/api/prompts", promptsRouter);
  app.use("/api/workflows", workflowsRouter);
  app.use("/api/resources", resourcesRouter);
  app.use("/api/assignments", assignmentsRouter);

  // Apply stricter rate limit to submission routes
  app.use("/api/assignments/:id/submit", submissionLimiter);

  // User state routes
  app.use("/api/users", usersRouter);

  // Serve uploaded files in development (in production, use nginx or CDN)
  if (process.env.NODE_ENV !== "production") {
    app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
  }

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    const publicPath = path.resolve(__dirname, "../public");
    app.use(express.static(publicPath));

    // Serve index.html for all non-API routes (SPA fallback)
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(publicPath, "index.html"));
    });
  }

  // 404 handler for API routes
  app.use("/api/*", notFoundHandler);

  // Global error handler
  app.use(errorHandler);

  return app;
}

// Start server if not imported as module
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createServer();
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

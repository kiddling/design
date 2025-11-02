import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import type { HealthResponse } from "@shared/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createServer() {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // CORS
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
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

  // API routes will go here
  app.get("/api/*", (_req: Request, res: Response) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    const publicPath = path.resolve(__dirname, "../public");
    app.use(express.static(publicPath));

    // Serve index.html for all non-API routes (SPA fallback)
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(publicPath, "index.html"));
    });
  }

  // Error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

// Start server if not imported as module
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createServer();
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

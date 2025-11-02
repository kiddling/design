import type { Request, Response, NextFunction } from "express";
import type { ApiResponse } from "@shared/types";

export function notFoundHandler(req: Request, res: Response) {
  const response: ApiResponse<never> = {
    success: false,
    error: `Endpoint not found: ${req.method} ${req.path}`,
  };
  res.status(404).json(response);
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Server error:", err);

  const response: ApiResponse<never> = {
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  };

  res.status(500).json(response);
}

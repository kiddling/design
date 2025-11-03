import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    endpoints: [
      "/api/courses",
      "/api/knowledge",
      "/api/cases",
      "/api/prompts",
      "/api/workflows",
      "/api/resources",
      "/api/assignments",
    ],
  });
}

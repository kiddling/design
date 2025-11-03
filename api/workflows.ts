import type { VercelRequest, VercelResponse } from "@vercel/node";
import { workflows } from "../shared/data/workflows.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { id, page = "1", pageSize = "10" } = req.query;

    if (id && typeof id === "string") {
      const workflow = workflows.find((w) => w.id === id);
      if (!workflow) {
        return res.status(404).json({
          success: false,
          error: "Workflow not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: workflow,
      });
    }

    const workflowsArray = [...workflows];

    const pageNum = parseInt(page as string, 10);
    const pageSizeNum = parseInt(pageSize as string, 10);
    const total = workflowsArray.length;
    const totalPages = Math.ceil(total / pageSizeNum);
    const start = (pageNum - 1) * pageSizeNum;
    const end = start + pageSizeNum;
    const items = workflowsArray.slice(start, end);

    return res.status(200).json({
      success: true,
      data: {
        items,
        total,
        page: pageNum,
        pageSize: pageSizeNum,
        totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

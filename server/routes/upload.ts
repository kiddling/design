import express from "express";
import fs from "node:fs";
import path from "node:path";
import { nanoid } from "nanoid";
import type { SubmissionFile } from "@shared/types";
import { resolveStoragePath } from "../utils/storage.js";

const router = express.Router();

router.post("/", express.raw({ type: "*/*", limit: "50mb" }), async (req, res) => {
  try {
    const filename = req.query.filename as string;
    const fileType = req.query.type as string || "other";
    
    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    const fileId = nanoid();
    const ext = path.extname(filename);
    const storedFilename = `${fileId}${ext}`;
    const uploadDir = resolveStoragePath("uploads");
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, storedFilename);
    
    fs.writeFileSync(filePath, req.body);

    const file: SubmissionFile = {
      id: fileId,
      filename: storedFilename,
      originalName: filename,
      path: `/api/files/${storedFilename}`,
      size: req.body.length,
      mimeType: req.headers["content-type"] || "application/octet-stream",
      uploadedAt: new Date().toISOString(),
      type: fileType as any,
    };

    res.json(file);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

export default router;

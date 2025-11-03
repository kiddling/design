import express from "express";
import multer from "multer";
import path from "node:path";
import { nanoid } from "nanoid";
import type { Submission, SubmissionFile, UserProgress } from "@shared/types";
import {
  getAssignmentById,
  getAssignments,
  getSubmissions,
  getUserProgress,
  saveSubmission,
  saveUserProgress,
} from "../data/assignments.js";
import { ensureStorageDirectory } from "../utils/storage.js";

const router = express.Router();

const uploadStorage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const assignmentId = req.params.id ?? "general";
    const dir = ensureStorageDirectory("uploads", assignmentId);
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${nanoid(8)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: uploadStorage,
  limits: {
    fileSize: 25 * 1024 * 1024,
    files: 10,
  },
});

const FIELD_TYPE_MAP: Record<string, SubmissionFile["type"]> = {
  photos: "photo",
  diagram: "diagram",
  attachments: "document",
};

router.get("/", (_req, res) => {
  try {
    const assignments = getAssignments();
    res.json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const assignment = getAssignmentById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    res.json(assignment);
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res.status(500).json({ error: "Failed to fetch assignment" });
  }
});

router.get("/:id/submissions", (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req.query.userId as string) || "default-user";

    const submissions = getSubmissions(id, userId);
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

router.post(
  "/:id/submissions",
  upload.fields([
    { name: "photos", maxCount: 5 },
    { name: "diagram", maxCount: 2 },
    { name: "attachments", maxCount: 5 },
  ]),
  (req, res) => {
    try {
      const { id } = req.params;
      const userId = (req.body.userId as string) || "default-user";

      const assignment = getAssignmentById(id);
      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      const filesFieldMap = req.files as Record<string, Express.Multer.File[]> | undefined;
      const submittedFiles: SubmissionFile[] = [];

      if (filesFieldMap) {
        for (const [fieldName, files] of Object.entries(filesFieldMap)) {
          const submissionFileType = FIELD_TYPE_MAP[fieldName] ?? "other";

          files.forEach((file) => {
            submittedFiles.push({
              id: nanoid(),
              filename: file.filename,
              originalName: file.originalname,
              path: `/api/files/${id}/${file.filename}`,
              size: file.size,
              mimeType: file.mimetype,
              uploadedAt: new Date().toISOString(),
              type: submissionFileType,
            });
          });
        }
      }

      const textFields = {
        problemStatement: req.body.problemStatement ?? "",
        hmwQuestion: req.body.hmwQuestion ?? "",
        notes: req.body.notes ?? "",
      } satisfies Submission["textFields"];

      const submission: Submission = {
        id: nanoid(),
        assignmentId: id,
        userId,
        submittedAt: new Date().toISOString(),
        status: "submitted",
        files: submittedFiles,
        textFields,
      };

      saveSubmission(submission);
      res.json(submission);
    } catch (error) {
      console.error("Error saving submission:", error);
      res.status(500).json({ error: "Failed to save submission" });
    }
  }
);

router.get("/:id/progress", (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req.query.userId as string) || "default-user";

    const progress = getUserProgress(userId, id);
    res.json(progress || { userId, assignmentId: id, checklist: {}, lastUpdated: new Date().toISOString() });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

router.post("/:id/progress", express.json(), (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId || "default-user";

    const progress: UserProgress = {
      userId,
      assignmentId: id,
      checklist: req.body.checklist || {},
      lastUpdated: new Date().toISOString(),
    };

    saveUserProgress(progress);
    res.json(progress);
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).json({ error: "Failed to save progress" });
  }
});

export default router;

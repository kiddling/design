import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";
import { assignments } from "@shared/data/assignments";
import {
  createSubmissionSchema,
  updateSubmissionSchema,
} from "@shared/schemas";
import {
  saveSubmission,
  getSubmissionById,
  getUserAssignmentSubmission,
  getUserSubmissions,
  getAssignmentSubmissions,
} from "../storage/index";
import type {
  Assignment,
  AssignmentSubmission,
  ApiResponse,
  SubmissionFile,
} from "@shared/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.resolve(__dirname, "../uploads");
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${nanoid()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Allow images, PDFs, and common document formats
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "video/mp4",
      "video/quicktime",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`));
    }
  },
});

// Get all assignments
router.get("/", (_req, res) => {
  const response: ApiResponse<Assignment[]> = {
    success: true,
    data: assignments,
  };
  res.json(response);
});

// Get assignment by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const assignment = assignments.find(a => a.id === id);

  if (!assignment) {
    const response: ApiResponse<never> = {
      success: false,
      error: "Assignment not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Assignment> = {
    success: true,
    data: assignment,
  };
  res.json(response);
});

// Get assignment submissions (all or by assignment ID)
router.get("/:id/submissions", async (req, res) => {
  try {
    const { id } = req.params;
    const submissions = await getAssignmentSubmissions(id);

    const response: ApiResponse<AssignmentSubmission[]> = {
      success: true,
      data: submissions,
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch submissions",
    };
    res.status(500).json(response);
  }
});

// Create or update a submission
router.post("/:id/submit", upload.array("files", 10), async (req, res) => {
  try {
    const { id: assignmentId } = req.params;
    const userId = req.body.userId || "demo-user"; // Stub auth

    // Check if assignment exists
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Assignment not found",
      };
      return res.status(404).json(response);
    }

    // Parse text fields from body
    const fieldsData = req.body.fields ? JSON.parse(req.body.fields) : [];
    const statusData = req.body.status || "draft";

    // Validate submission data
    const validationResult = createSubmissionSchema.safeParse({
      assignmentId,
      status: statusData,
      fields: fieldsData,
    });

    if (!validationResult.success) {
      const response: ApiResponse<never> = {
        success: false,
        error: validationResult.error.message,
      };
      return res.status(400).json(response);
    }

    // Check if submission already exists
    const existingSubmission = await getUserAssignmentSubmission(
      userId,
      assignmentId
    );

    // Process uploaded files
    const files: SubmissionFile[] = [];
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const fileData: SubmissionFile = {
          requirementId: file.fieldname,
          filename: file.filename,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          path: file.path,
          uploadedAt: new Date().toISOString(),
        };
        files.push(fileData);
      }
    }

    const now = new Date().toISOString();

    const submission: AssignmentSubmission = {
      id: existingSubmission?.id || nanoid(),
      assignmentId,
      userId,
      status: statusData,
      submittedAt:
        statusData === "submitted" ? now : existingSubmission?.submittedAt,
      fields: fieldsData,
      files: [...(existingSubmission?.files || []), ...files],
      score: existingSubmission?.score,
      feedback: existingSubmission?.feedback,
      createdAt: existingSubmission?.createdAt || now,
      updatedAt: now,
    };

    await saveSubmission(submission);

    const response: ApiResponse<AssignmentSubmission> = {
      success: true,
      data: submission,
      message:
        statusData === "submitted"
          ? "Assignment submitted successfully"
          : "Draft saved",
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to submit assignment",
    };
    res.status(500).json(response);
  }
});

// Get submission by ID
router.get("/submissions/:submissionId", async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submission = await getSubmissionById(submissionId);

    if (!submission) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Submission not found",
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse<AssignmentSubmission> = {
      success: true,
      data: submission,
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch submission",
    };
    res.status(500).json(response);
  }
});

// Update submission (for grading)
router.patch("/submissions/:submissionId", async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submission = await getSubmissionById(submissionId);

    if (!submission) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Submission not found",
      };
      return res.status(404).json(response);
    }

    const validationResult = updateSubmissionSchema.safeParse(req.body);

    if (!validationResult.success) {
      const response: ApiResponse<never> = {
        success: false,
        error: validationResult.error.message,
      };
      return res.status(400).json(response);
    }

    const updates = validationResult.data;
    const updatedSubmission: AssignmentSubmission = {
      ...submission,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (updates.status === "submitted" && !submission.submittedAt) {
      updatedSubmission.submittedAt = new Date().toISOString();
    }

    await saveSubmission(updatedSubmission);

    const response: ApiResponse<AssignmentSubmission> = {
      success: true,
      data: updatedSubmission,
      message: "Submission updated successfully",
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update submission",
    };
    res.status(500).json(response);
  }
});

export default router;

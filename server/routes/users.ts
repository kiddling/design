import { Router } from "express";
import { nanoid } from "nanoid";
import { updateProgressSchema, addFavoriteSchema } from "@shared/schemas";
import {
  getUserProgress,
  saveUserProgress,
  getUserFavorites,
  addUserFavorite,
  removeUserFavorite,
  getUserHistory,
  addUserHistory,
  getUserSubmissions,
} from "../storage/index";
import type {
  UserProgress,
  UserFavorite,
  UserHistoryItem,
  AssignmentSubmission,
  ApiResponse,
} from "@shared/types";

const router = Router();

// Get user progress for all courses
router.get("/:userId/progress", async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await getUserProgress(userId);

    const response: ApiResponse<UserProgress[]> = {
      success: true,
      data: progress,
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch progress",
    };
    res.status(500).json(response);
  }
});

// Update or create user progress
router.post("/:userId/progress", async (req, res) => {
  try {
    const { userId } = req.params;

    const validationResult = updateProgressSchema.safeParse(req.body);

    if (!validationResult.success) {
      const response: ApiResponse<never> = {
        success: false,
        error: validationResult.error.message,
      };
      return res.status(400).json(response);
    }

    const { courseId, completedSections, currentSection, progressPercentage } =
      validationResult.data;

    const now = new Date().toISOString();

    // Get existing progress or create new
    const existingProgress = await getUserProgress(userId);
    const courseProgress = existingProgress.find(p => p.courseId === courseId);

    const progress: UserProgress = {
      userId,
      courseId,
      completedSections:
        completedSections !== undefined
          ? completedSections
          : courseProgress?.completedSections || [],
      currentSection:
        currentSection !== undefined
          ? currentSection
          : courseProgress?.currentSection,
      lastAccessed: now,
      progressPercentage:
        progressPercentage !== undefined
          ? progressPercentage
          : courseProgress?.progressPercentage || 0,
      startedAt: courseProgress?.startedAt || now,
      completedAt:
        progressPercentage === 100 ? now : courseProgress?.completedAt,
    };

    await saveUserProgress(progress);

    const response: ApiResponse<UserProgress> = {
      success: true,
      data: progress,
      message: "Progress updated successfully",
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update progress",
    };
    res.status(500).json(response);
  }
});

// Get user favorites
router.get("/:userId/favorites", async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await getUserFavorites(userId);

    const response: ApiResponse<UserFavorite[]> = {
      success: true,
      data: favorites,
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch favorites",
    };
    res.status(500).json(response);
  }
});

// Add a favorite
router.post("/:userId/favorites", async (req, res) => {
  try {
    const { userId } = req.params;

    const validationResult = addFavoriteSchema.safeParse(req.body);

    if (!validationResult.success) {
      const response: ApiResponse<never> = {
        success: false,
        error: validationResult.error.message,
      };
      return res.status(400).json(response);
    }

    const { itemId, itemType } = validationResult.data;

    const favorite: UserFavorite = {
      id: nanoid(),
      userId,
      itemId,
      itemType,
      createdAt: new Date().toISOString(),
    };

    await addUserFavorite(favorite);

    // Also add to history
    const historyItem: UserHistoryItem = {
      id: nanoid(),
      userId,
      itemId,
      itemType,
      action: "favorite",
      timestamp: new Date().toISOString(),
    };
    await addUserHistory(historyItem);

    const response: ApiResponse<UserFavorite> = {
      success: true,
      data: favorite,
      message: "Favorite added successfully",
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add favorite",
    };
    res.status(500).json(response);
  }
});

// Remove a favorite
router.delete("/:userId/favorites/:itemType/:itemId", async (req, res) => {
  try {
    const { userId, itemId, itemType } = req.params;

    const removed = await removeUserFavorite(userId, itemId, itemType);

    if (!removed) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Favorite not found",
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse<{ removed: boolean }> = {
      success: true,
      data: { removed: true },
      message: "Favorite removed successfully",
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to remove favorite",
    };
    res.status(500).json(response);
  }
});

// Get user history
router.get("/:userId/history", async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : undefined;

    const history = await getUserHistory(userId, limit);

    const response: ApiResponse<UserHistoryItem[]> = {
      success: true,
      data: history,
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch history",
    };
    res.status(500).json(response);
  }
});

// Add a history item (for tracking views, etc.)
router.post("/:userId/history", async (req, res) => {
  try {
    const { userId } = req.params;
    const { itemId, itemType, action, metadata } = req.body;

    if (!itemId || !itemType || !action) {
      const response: ApiResponse<never> = {
        success: false,
        error: "Missing required fields: itemId, itemType, action",
      };
      return res.status(400).json(response);
    }

    const historyItem: UserHistoryItem = {
      id: nanoid(),
      userId,
      itemId,
      itemType,
      action,
      timestamp: new Date().toISOString(),
      metadata,
    };

    await addUserHistory(historyItem);

    const response: ApiResponse<UserHistoryItem> = {
      success: true,
      data: historyItem,
      message: "History item added",
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to add history item",
    };
    res.status(500).json(response);
  }
});

// Get user submissions
router.get("/:userId/submissions", async (req, res) => {
  try {
    const { userId } = req.params;
    const submissions = await getUserSubmissions(userId);

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

export default router;

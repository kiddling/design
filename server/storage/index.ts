import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import type {
  UserProgress,
  UserFavorite,
  UserHistoryItem,
  AssignmentSubmission,
} from "@shared/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORAGE_DIR = path.resolve(__dirname);

// Storage files
const FILES = {
  progress: path.join(STORAGE_DIR, "user-progress.json"),
  favorites: path.join(STORAGE_DIR, "user-favorites.json"),
  history: path.join(STORAGE_DIR, "user-history.json"),
  submissions: path.join(STORAGE_DIR, "assignment-submissions.json"),
};

// Queue for async read/write operations to prevent race conditions
const writeQueue: Map<string, Promise<void>> = new Map();

async function ensureFile(filepath: string, defaultData: any = []) {
  try {
    await fs.access(filepath);
  } catch {
    await fs.writeFile(filepath, JSON.stringify(defaultData, null, 2), "utf-8");
  }
}

async function readData<T>(
  filepath: string,
  defaultData: T[] = []
): Promise<T[]> {
  await ensureFile(filepath, defaultData);
  const data = await fs.readFile(filepath, "utf-8");
  return JSON.parse(data);
}

async function writeData<T>(filepath: string, data: T[]): Promise<void> {
  const writeOperation = async () => {
    await fs.writeFile(filepath, JSON.stringify(data, null, 2), "utf-8");
  };

  // Wait for previous write to complete
  const currentWrite = writeQueue.get(filepath);
  if (currentWrite) {
    await currentWrite;
  }

  // Queue this write
  const newWrite = writeOperation();
  writeQueue.set(filepath, newWrite);

  await newWrite;
  writeQueue.delete(filepath);
}

// User Progress operations
export async function getAllProgress(): Promise<UserProgress[]> {
  return readData<UserProgress>(FILES.progress);
}

export async function getUserProgress(userId: string): Promise<UserProgress[]> {
  const allProgress = await getAllProgress();
  return allProgress.filter(p => p.userId === userId);
}

export async function getUserCourseProgress(
  userId: string,
  courseId: string
): Promise<UserProgress | undefined> {
  const allProgress = await getAllProgress();
  return allProgress.find(p => p.userId === userId && p.courseId === courseId);
}

export async function saveUserProgress(
  progress: UserProgress
): Promise<UserProgress> {
  const allProgress = await getAllProgress();
  const index = allProgress.findIndex(
    p => p.userId === progress.userId && p.courseId === progress.courseId
  );

  if (index >= 0) {
    allProgress[index] = progress;
  } else {
    allProgress.push(progress);
  }

  await writeData(FILES.progress, allProgress);
  return progress;
}

// User Favorites operations
export async function getAllFavorites(): Promise<UserFavorite[]> {
  return readData<UserFavorite>(FILES.favorites);
}

export async function getUserFavorites(
  userId: string
): Promise<UserFavorite[]> {
  const allFavorites = await getAllFavorites();
  return allFavorites.filter(f => f.userId === userId);
}

export async function addUserFavorite(
  favorite: UserFavorite
): Promise<UserFavorite> {
  const allFavorites = await getAllFavorites();

  // Check if already exists
  const exists = allFavorites.some(
    f =>
      f.userId === favorite.userId &&
      f.itemId === favorite.itemId &&
      f.itemType === favorite.itemType
  );

  if (!exists) {
    allFavorites.push(favorite);
    await writeData(FILES.favorites, allFavorites);
  }

  return favorite;
}

export async function removeUserFavorite(
  userId: string,
  itemId: string,
  itemType: string
): Promise<boolean> {
  const allFavorites = await getAllFavorites();
  const filtered = allFavorites.filter(
    f =>
      !(f.userId === userId && f.itemId === itemId && f.itemType === itemType)
  );

  if (filtered.length !== allFavorites.length) {
    await writeData(FILES.favorites, filtered);
    return true;
  }

  return false;
}

// User History operations
export async function getAllHistory(): Promise<UserHistoryItem[]> {
  return readData<UserHistoryItem>(FILES.history);
}

export async function getUserHistory(
  userId: string,
  limit?: number
): Promise<UserHistoryItem[]> {
  const allHistory = await getAllHistory();
  const userHistory = allHistory
    .filter(h => h.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  return limit ? userHistory.slice(0, limit) : userHistory;
}

export async function addUserHistory(
  item: UserHistoryItem
): Promise<UserHistoryItem> {
  const allHistory = await getAllHistory();
  allHistory.push(item);
  await writeData(FILES.history, allHistory);
  return item;
}

// Assignment Submission operations
export async function getAllSubmissions(): Promise<AssignmentSubmission[]> {
  return readData<AssignmentSubmission>(FILES.submissions);
}

export async function getSubmissionById(
  id: string
): Promise<AssignmentSubmission | undefined> {
  const allSubmissions = await getAllSubmissions();
  return allSubmissions.find(s => s.id === id);
}

export async function getUserSubmissions(
  userId: string
): Promise<AssignmentSubmission[]> {
  const allSubmissions = await getAllSubmissions();
  return allSubmissions.filter(s => s.userId === userId);
}

export async function getAssignmentSubmissions(
  assignmentId: string
): Promise<AssignmentSubmission[]> {
  const allSubmissions = await getAllSubmissions();
  return allSubmissions.filter(s => s.assignmentId === assignmentId);
}

export async function getUserAssignmentSubmission(
  userId: string,
  assignmentId: string
): Promise<AssignmentSubmission | undefined> {
  const allSubmissions = await getAllSubmissions();
  return allSubmissions.find(
    s => s.userId === userId && s.assignmentId === assignmentId
  );
}

export async function saveSubmission(
  submission: AssignmentSubmission
): Promise<AssignmentSubmission> {
  const allSubmissions = await getAllSubmissions();
  const index = allSubmissions.findIndex(s => s.id === submission.id);

  if (index >= 0) {
    allSubmissions[index] = submission;
  } else {
    allSubmissions.push(submission);
  }

  await writeData(FILES.submissions, allSubmissions);
  return submission;
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const allSubmissions = await getAllSubmissions();
  const filtered = allSubmissions.filter(s => s.id !== id);

  if (filtered.length !== allSubmissions.length) {
    await writeData(FILES.submissions, filtered);
    return true;
  }

  return false;
}

// Initialize storage on import
Promise.all([
  ensureFile(FILES.progress, []),
  ensureFile(FILES.favorites, []),
  ensureFile(FILES.history, []),
  ensureFile(FILES.submissions, []),
]).catch(err => {
  console.error("Failed to initialize storage:", err);
});

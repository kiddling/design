import fs from "fs/promises";
import path from "path";

export async function ensureDirectory(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

export async function deleteFile(filePath: string): Promise<boolean> {
  try {
    await fs.unlink(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function getFileStats(filePath: string) {
  try {
    const stats = await fs.stat(filePath);
    return stats;
  } catch {
    return null;
  }
}

export function getFileExtension(filename: string): string {
  return path.extname(filename).toLowerCase();
}

export function isImageFile(filename: string): boolean {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  return imageExtensions.includes(getFileExtension(filename));
}

export function isVideoFile(filename: string): boolean {
  const videoExtensions = [".mp4", ".mov", ".avi", ".webm"];
  return videoExtensions.includes(getFileExtension(filename));
}

export function isDocumentFile(filename: string): boolean {
  const documentExtensions = [".pdf", ".doc", ".docx", ".txt", ".md"];
  return documentExtensions.includes(getFileExtension(filename));
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

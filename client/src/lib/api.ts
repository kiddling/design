import axios from "axios";
import type { Assignment, Submission, UserProgress } from "@shared/types";

const API_BASE = import.meta.env.PROD ? "/api" : "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE,
});

export async function getAssignments(): Promise<Assignment[]> {
  const response = await api.get("/assignments");
  return response.data;
}

export async function getAssignmentById(id: string): Promise<Assignment> {
  const response = await api.get(`/assignments/${id}`);
  return response.data;
}

export async function getSubmissions(assignmentId: string, userId: string = "default-user"): Promise<Submission[]> {
  const response = await api.get(`/assignments/${assignmentId}/submissions`, {
    params: { userId },
  });
  return response.data;
}

export async function saveSubmission(
  assignmentId: string,
  data: {
    photos?: File[];
    diagram?: File[];
    attachments?: File[];
    problemStatement?: string;
    hmwQuestion?: string;
    notes?: string;
  },
  userId: string = "default-user",
  onProgress?: (progress: number) => void
): Promise<Submission> {
  const formData = new FormData();
  formData.append("userId", userId);

  if (data.photos) {
    data.photos.forEach((file) => formData.append("photos", file));
  }
  if (data.diagram) {
    data.diagram.forEach((file) => formData.append("diagram", file));
  }
  if (data.attachments) {
    data.attachments.forEach((file) => formData.append("attachments", file));
  }
  if (data.problemStatement) {
    formData.append("problemStatement", data.problemStatement);
  }
  if (data.hmwQuestion) {
    formData.append("hmwQuestion", data.hmwQuestion);
  }
  if (data.notes) {
    formData.append("notes", data.notes);
  }

  const response = await api.post(`/assignments/${assignmentId}/submissions`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress?.(percentCompleted);
      }
    },
  });
  return response.data;
}

export async function getUserProgress(
  assignmentId: string,
  userId: string = "default-user"
): Promise<UserProgress> {
  const response = await api.get(`/assignments/${assignmentId}/progress`, {
    params: { userId },
  });
  return response.data;
}

export async function saveUserProgress(
  assignmentId: string,
  checklist: Record<string, boolean>,
  userId: string = "default-user"
): Promise<UserProgress> {
  const response = await api.post(`/assignments/${assignmentId}/progress`, {
    userId,
    checklist,
  });
  return response.data;
}

export function getFileUrl(path: string): string {
  if (path.startsWith("http")) {
    return path;
  }
  return `${API_BASE.replace("/api", "")}${path}`;
}

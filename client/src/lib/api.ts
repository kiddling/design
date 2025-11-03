import axios from "axios";
import type { Course, UserProgress } from "@shared/types/course";
import type { Assignment } from "@shared/types";

const API_BASE_URL = import.meta.env.PROD ? "/api" : "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const courseApi = {
  getCourses: () => api.get<Course[]>("/courses"),
  getCourseById: (id: string) => api.get<Course>(`/courses/${id}`),
  getProgress: (courseId: string) =>
    api.get<UserProgress>(`/courses/${courseId}/progress`),
  updateProgress: (courseId: string, completedSections: string[]) =>
    api.post<UserProgress>(`/courses/${courseId}/progress`, {
      completedSections,
    }),
};

export async function getAssignments(): Promise<Assignment[]> {
  const response = await api.get<Assignment[]>("/assignments");
  return response.data;
}

export async function saveUserProgress(userId: string, data: any): Promise<UserProgress> {
  const response = await api.post<UserProgress>(`/users/${userId}/progress`, data);
  return response.data;
}

export async function saveSubmission(assignmentId: string, data: any): Promise<any> {
  const response = await api.post(`/assignments/${assignmentId}/submissions`, data);
  return response.data;
}

export async function getAssignmentById(id: string): Promise<Assignment> {
  const response = await api.get<Assignment>(`/assignments/${id}`);
  return response.data;
}

export async function getSubmissions(assignmentId: string): Promise<any[]> {
  const response = await api.get(`/assignments/${assignmentId}/submissions`);
  return response.data;
}

export async function getUserProgress(userId: string): Promise<UserProgress> {
  const response = await api.get<UserProgress>(`/users/${userId}/progress`);
  return response.data;
}

export function getFileUrl(fileId: string): string {
  return `${API_BASE_URL}/files/${fileId}`;
}

import axios from "axios";
import type { Course, UserProgress } from "@shared/types/course";

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

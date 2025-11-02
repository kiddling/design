// Shared types between client and server

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export type DifficultyLevel = "base" | "advance" | "stretch";

export interface Course {
  id: string;
  title: string;
  description: string;
  loop: number;
  session: number;
}

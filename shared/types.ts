export type DifficultyLevel = "base" | "advance" | "stretch";

export interface Course {
  id: string;
  week: number;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
}

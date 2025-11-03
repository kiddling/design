import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@shared/types";

export interface DifficultyBadgeProps {
  difficulty?: Difficulty;
  level?: Difficulty;
  className?: string;
}

const difficultyConfig = {
  base: {
    label: "基础 Base",
    className:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  },
  advance: {
    label: "进阶 Advance",
    className:
      "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  },
  stretch: {
    label: "挑战 Stretch",
    className:
      "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
  },
};

export function DifficultyBadge({
  difficulty,
  level,
  className,
}: DifficultyBadgeProps) {
  const diffValue = difficulty || level || "base";
  const config = difficultyConfig[diffValue];

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}

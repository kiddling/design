import * as React from "react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

export type DifficultyLevel = "base" | "advance" | "stretch";

interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
  className?: string;
}

const difficultyConfig = {
  base: {
    label: "基础",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  advance: {
    label: "进阶",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  stretch: {
    label: "挑战",
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
};

export function DifficultyBadge({
  difficulty,
  className,
}: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];

  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}

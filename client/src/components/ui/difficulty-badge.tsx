import { Badge } from "./badge";
import { cn } from "@/lib/utils";

export type DifficultyLevel = "base" | "advance" | "stretch";

interface DifficultyBadgeProps {
  level: DifficultyLevel;
  className?: string;
}

const difficultyConfig = {
  base: {
    label: "基础",
    className:
      "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  },
  advance: {
    label: "进阶",
    className:
      "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  },
  stretch: {
    label: "拓展",
    className:
      "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  },
};

export function DifficultyBadge({ level, className }: DifficultyBadgeProps) {
  const config = difficultyConfig[level];
  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}

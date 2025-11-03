import * as React from "react";
import { cn } from "@/lib/utils";

type HighlightVariant = "default" | "accent" | "success" | "warning" | "error";

interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: HighlightVariant;
}

const variantClasses: Record<HighlightVariant, string> = {
  default: "bg-primary/20 text-primary-foreground dark:bg-primary/30",
  accent: "bg-accent/50 text-accent-foreground",
  success:
    "bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-300",
  warning:
    "bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-300",
  error: "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-300",
};

export function Highlight({
  variant = "default",
  className,
  children,
  ...props
}: HighlightProps) {
  return (
    <span
      className={cn(
        "px-1.5 py-0.5 rounded font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

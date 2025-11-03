import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface ChecklistItem {
  id: string;
  label: string;
  checked?: boolean;
}

interface ChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ChecklistItem[];
  onItemToggle?: (id: string) => void;
}

export function Checklist({
  items,
  onItemToggle,
  className,
  ...props
}: ChecklistProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {items.map(item => (
        <button
          key={item.id}
          type="button"
          onClick={() => onItemToggle?.(item.id)}
          className={cn(
            "flex items-center gap-3 w-full p-3 rounded-lg border transition-colors text-left",
            item.checked
              ? "bg-primary/5 border-primary/20"
              : "bg-background hover:bg-accent"
          )}
        >
          <div
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded border-2 shrink-0",
              item.checked
                ? "bg-primary border-primary"
                : "border-muted-foreground/30"
            )}
          >
            {item.checked && (
              <Check className="h-3.5 w-3.5 text-primary-foreground" />
            )}
          </div>
          <span
            className={cn(
              "text-sm",
              item.checked && "line-through text-muted-foreground"
            )}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

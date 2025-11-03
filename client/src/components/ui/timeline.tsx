import * as React from "react";
import { cn } from "@/lib/utils";
import { Circle, CheckCircle } from "lucide-react";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  completed?: boolean;
}

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
}

export function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {items.map((item, index) => (
        <div key={item.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2",
                item.completed
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30 bg-background"
              )}
            >
              {item.completed ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </div>
            {index < items.length - 1 && (
              <div
                className={cn(
                  "w-0.5 flex-1 min-h-[40px]",
                  item.completed ? "bg-primary" : "bg-muted-foreground/30"
                )}
              />
            )}
          </div>
          <div className="flex-1 pb-8">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold">{item.title}</h4>
              {item.date && (
                <span className="text-xs text-muted-foreground">{item.date}</span>
              )}
            </div>
            {item.description && (
              <p className="text-sm text-muted-foreground">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

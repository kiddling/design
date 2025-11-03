import * as React from "react";
import { cn } from "@/lib/utils";

interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 2 | 3 | 4;
}

export function MasonryGrid({
  cols = 3,
  className,
  children,
  ...props
}: MasonryGridProps) {
  const colClasses = {
    2: "columns-1 sm:columns-2",
    3: "columns-1 sm:columns-2 lg:columns-3",
    4: "columns-1 sm:columns-2 md:columns-3 lg:columns-4",
  };

  return (
    <div
      className={cn(
        "gap-4 sm:gap-6",
        colClasses[cols],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function MasonryItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("break-inside-avoid mb-4 sm:mb-6", className)}
      {...props}
    />
  );
}

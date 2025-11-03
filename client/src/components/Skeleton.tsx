import { type CSSProperties, type HTMLAttributes } from "react";

type SkeletonVariant = "text" | "card" | "avatar" | "button";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

const variantStyles: Record<SkeletonVariant, CSSProperties> = {
  text: { height: "0.75rem", maxWidth: "18rem", width: "100%" },
  card: { height: "11rem", width: "100%", borderRadius: "1rem" },
  avatar: { height: "3rem", width: "3rem", borderRadius: "9999px" },
  button: { height: "2.5rem", width: "6rem", borderRadius: "0.75rem" },
};

export function Skeleton({ className, variant = "card", style, ...props }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      className={`skeleton ${className ?? ""}`.trim()}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="vertical-stack">
      <Skeleton variant="card" />
      <Skeleton variant="text" style={{ maxWidth: "12rem" }} />
      <Skeleton variant="text" style={{ maxWidth: "9rem" }} />
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="vertical-stack" role="status" aria-label="Loading list">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="horizontal-stack">
          <Skeleton variant="avatar" />
          <div className="vertical-stack" style={{ flex: 1 }}>
            <Skeleton variant="text" style={{ maxWidth: "100%" }} />
            <Skeleton variant="text" style={{ maxWidth: "60%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

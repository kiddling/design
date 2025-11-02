import type { DifficultyLevel } from "@shared/types";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const levels: DifficultyLevel[] = ["base", "advance", "stretch"];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">数字设计构成</h1>
      <p className="text-lg text-muted-foreground">
        Digital Design Composition Portal
      </p>
      <div className="mt-8 flex gap-2">
        {levels.map((level) => (
          <span
            key={level}
            className="px-3 py-1 rounded-full text-sm bg-secondary"
          >
            {level}
          </span>
        ))}
      </div>
      <div className="mt-8">
        <Button>Test Button</Button>
      </div>
    </div>
  );
}

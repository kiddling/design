import { useState } from "react";
import { Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { DifficultyBadge } from "./ui/difficulty-badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import type { Case } from "@shared/types";
import { disciplineLabels } from "@shared/mock-data";

interface CaseCardProps {
  case: Case;
  onSelect: (caseItem: Case) => void;
  onToggleFavorite: (caseId: string) => void;
}

export function CaseCard({
  case: caseItem,
  onSelect,
  onToggleFavorite,
}: CaseCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card
      className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
      onClick={() => onSelect(caseItem)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-muted">
        {caseItem.imageUrl && (
          <img
            src={caseItem.imageUrl}
            alt={caseItem.title}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-all duration-300 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={e => {
            e.stopPropagation();
            onToggleFavorite(caseItem.id);
          }}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              caseItem.isFavorite
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            )}
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-tight line-clamp-2">
            {caseItem.title}
          </h3>
        </div>

        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {caseItem.keyInsight}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {disciplineLabels[caseItem.discipline]}
          </Badge>
          <DifficultyBadge difficulty={caseItem.difficulty} />
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {caseItem.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {caseItem.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{caseItem.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

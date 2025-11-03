import { X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Discipline, Difficulty } from "@shared/types";
import { disciplineLabels, difficultyLabels, allTags } from "@shared/mock-data";

interface CaseFiltersProps {
  selectedDisciplines: Discipline[];
  selectedTags: string[];
  selectedDifficulty: Difficulty[];
  onDisciplinesChange: (disciplines: Discipline[]) => void;
  onTagsChange: (tags: string[]) => void;
  onDifficultyChange: (difficulty: Difficulty[]) => void;
  onClearAll: () => void;
  className?: string;
}

const disciplines: Discipline[] = [
  "architecture",
  "graphic-design",
  "product-design",
  "urban-planning",
  "digital-media",
];

const difficulties: Difficulty[] = ["base", "advance", "stretch"];

export function CaseFilters({
  selectedDisciplines,
  selectedTags,
  selectedDifficulty,
  onDisciplinesChange,
  onTagsChange,
  onDifficultyChange,
  onClearAll,
  className,
}: CaseFiltersProps) {
  const hasActiveFilters =
    selectedDisciplines.length > 0 ||
    selectedTags.length > 0 ||
    selectedDifficulty.length > 0;

  const toggleDiscipline = (discipline: Discipline) => {
    if (selectedDisciplines.includes(discipline)) {
      onDisciplinesChange(selectedDisciplines.filter(d => d !== discipline));
    } else {
      onDisciplinesChange([...selectedDisciplines, discipline]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const toggleDifficulty = (difficulty: Difficulty) => {
    if (selectedDifficulty.includes(difficulty)) {
      onDifficultyChange(selectedDifficulty.filter(d => d !== difficulty));
    } else {
      onDifficultyChange([...selectedDifficulty, difficulty]);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">筛选 Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-8 text-xs"
          >
            <X className="mr-1 h-3 w-3" />
            清除全部
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="mb-3 text-sm font-medium">专业领域 Discipline</h3>
          <div className="space-y-2">
            {disciplines.map(discipline => (
              <label
                key={discipline}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  checked={selectedDisciplines.includes(discipline)}
                  onCheckedChange={() => toggleDiscipline(discipline)}
                />
                <span className="text-sm">{disciplineLabels[discipline]}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium">难度 Difficulty</h3>
          <div className="space-y-2">
            {difficulties.map(difficulty => (
              <label
                key={difficulty}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  checked={selectedDifficulty.includes(difficulty)}
                  onCheckedChange={() => toggleDifficulty(difficulty)}
                />
                <span className="text-sm">{difficultyLabels[difficulty]}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium">标签 Tags</h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-2 pr-4">
              {allTags.map(tag => (
                <label
                  key={tag}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  <span className="text-sm">{tag}</span>
                </label>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-4 border-t">
          <h3 className="mb-2 text-sm font-medium">当前筛选</h3>
          <div className="flex flex-wrap gap-2">
            {selectedDisciplines.map(discipline => (
              <Badge
                key={discipline}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleDiscipline(discipline)}
              >
                {disciplineLabels[discipline]}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
            {selectedDifficulty.map(difficulty => (
              <Badge
                key={difficulty}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleDifficulty(difficulty)}
              >
                {difficultyLabels[difficulty]}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
            {selectedTags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { Search, Filter, Heart, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CaseCard } from "@/components/case-card";
import { CaseDetailModal } from "@/components/case-detail-modal";
import { CaseFilters } from "@/components/case-filters";
import { cn } from "@/lib/utils";
import type { Case, Discipline, Difficulty } from "@shared/types";
import { disciplineLabels } from "@shared/mock-data";

export function CasesPage() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(useSearch());

  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [selectedDisciplines, setSelectedDisciplines] = useState<Discipline[]>(
    (searchParams
      .get("disciplines")
      ?.split(",")
      .filter(Boolean) as Discipline[]) || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty[]>(
    (searchParams
      .get("difficulty")
      ?.split(",")
      .filter(Boolean) as Difficulty[]) || []
  );
  const [showFavorites, setShowFavorites] = useState(
    searchParams.get("favorites") === "true"
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (selectedDisciplines.length)
      params.set("disciplines", selectedDisciplines.join(","));
    if (selectedTags.length) params.set("tags", selectedTags.join(","));
    if (selectedDifficulty.length)
      params.set("difficulty", selectedDifficulty.join(","));
    if (showFavorites) params.set("favorites", "true");

    const caseId = searchParams.get("id");
    if (caseId) params.set("id", caseId);

    const newSearch = params.toString();
    window.history.replaceState(
      null,
      "",
      newSearch ? `?${newSearch}` : "/cases"
    );
  }, [
    debouncedSearch,
    selectedDisciplines,
    selectedTags,
    selectedDifficulty,
    showFavorites,
  ]);

  const { data: cases = [], isLoading } = useQuery({
    queryKey: [
      "cases",
      debouncedSearch,
      selectedDisciplines,
      selectedTags,
      selectedDifficulty,
      showFavorites,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (selectedDisciplines.length)
        params.set("disciplines", selectedDisciplines.join(","));
      if (selectedTags.length) params.set("tags", selectedTags.join(","));
      if (selectedDifficulty.length)
        params.set("difficulty", selectedDifficulty.join(","));
      if (showFavorites) params.set("favorites", "true");

      const response = await fetch(`/api/cases?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch cases");
      return response.json() as Promise<Case[]>;
    },
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (caseId: string) => {
      const response = await fetch(`/api/cases/${caseId}/favorite`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to toggle favorite");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });

  useEffect(() => {
    const caseId = searchParams.get("id");
    if (caseId && cases.length > 0) {
      const foundCase = cases.find(c => c.id === caseId);
      if (foundCase) {
        setSelectedCase(foundCase);
      }
    }
  }, [searchParams, cases]);

  const favoriteCases = useMemo(() => {
    return cases.filter(c => c.isFavorite);
  }, [cases]);

  const handleClearFilters = () => {
    setSelectedDisciplines([]);
    setSelectedTags([]);
    setSelectedDifficulty([]);
    setShowFavorites(false);
  };

  const handleDisciplineChipClick = (discipline: Discipline) => {
    setSelectedDisciplines([discipline]);
  };

  const handleToggleFavorite = (caseId: string) => {
    toggleFavoriteMutation.mutate(caseId);
  };

  const handleCaseSelect = (caseItem: Case) => {
    setSelectedCase(caseItem);
    const params = new URLSearchParams(window.location.search);
    params.set("id", caseItem.id);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleModalClose = (open: boolean) => {
    if (!open) {
      setSelectedCase(null);
      const params = new URLSearchParams(window.location.search);
      params.delete("id");
      const newSearch = params.toString();
      window.history.pushState(
        null,
        "",
        newSearch ? `?${newSearch}` : "/cases"
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">案例库 Case Library</h1>
          <p className="text-muted-foreground">
            跨学科设计案例，探索构成原理在不同专业领域的应用
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="搜索案例标题、描述、标签..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  筛选
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>筛选条件</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <CaseFilters
                    selectedDisciplines={selectedDisciplines}
                    selectedTags={selectedTags}
                    selectedDifficulty={selectedDifficulty}
                    onDisciplinesChange={setSelectedDisciplines}
                    onTagsChange={setSelectedTags}
                    onDifficultyChange={setSelectedDifficulty}
                    onClearAll={handleClearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex flex-wrap gap-2">
            {(Object.keys(disciplineLabels) as Discipline[]).map(discipline => (
              <Badge
                key={discipline}
                variant={
                  selectedDisciplines.includes(discipline)
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer"
                onClick={() => handleDisciplineChipClick(discipline)}
              >
                {disciplineLabels[discipline]}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <CaseFilters
                selectedDisciplines={selectedDisciplines}
                selectedTags={selectedTags}
                selectedDifficulty={selectedDifficulty}
                onDisciplinesChange={setSelectedDisciplines}
                onTagsChange={setSelectedTags}
                onDifficultyChange={setSelectedDifficulty}
                onClearAll={handleClearFilters}
              />

              {favoriteCases.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <Button
                    variant={showFavorites ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setShowFavorites(!showFavorites)}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    我的收藏 ({favoriteCases.length})
                  </Button>
                </div>
              )}
            </div>
          </aside>

          <main className="flex-1">
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[400px] rounded-xl bg-muted animate-pulse"
                  />
                ))}
              </div>
            ) : cases.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  未找到符合条件的案例
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  清除筛选条件
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cases.map(caseItem => (
                  <CaseCard
                    key={caseItem.id}
                    case={caseItem}
                    onSelect={handleCaseSelect}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}

            {!isLoading && cases.length > 0 && (
              <div className="mt-8 text-center text-sm text-muted-foreground">
                共找到 {cases.length} 个案例
              </div>
            )}
          </main>
        </div>
      </div>

      <CaseDetailModal
        case={selectedCase}
        open={!!selectedCase}
        onOpenChange={handleModalClose}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}

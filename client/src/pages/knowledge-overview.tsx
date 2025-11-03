import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { useKnowledgeCards } from "@/hooks/use-knowledge-cards";
import {
  KnowledgeCard,
  KnowledgeCategory,
  DifficultyLevel,
} from "@shared/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KnowledgeGraph } from "@/components/knowledge-graph";
import { KnowledgeCardDetail } from "@/components/knowledge-card-detail";
import { Heart, Check, Loader2, Grid3x3, Network } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryLabels: Record<KnowledgeCategory, string> = {
  theory: "理论",
  framework: "框架",
  lens: "透镜",
  method: "方法",
};

const difficultyLabels: Record<DifficultyLevel, string> = {
  base: "基础",
  advance: "进阶",
  stretch: "拓展",
};

type SortOption = "default" | "title" | "difficulty" | "category";
type FilterStatus = "all" | "favorite" | "studied" | "unstudied";

export function KnowledgeOverview() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<
    KnowledgeCategory | "all"
  >("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    DifficultyLevel | "all"
  >("all");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<"grid" | "graph">("grid");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const {
    cards,
    relationships,
    loading,
    toggleFavorite,
    toggleStudied,
    getUserState,
    getRelatedCards,
  } = useKnowledgeCards();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category") as KnowledgeCategory | null;
    const difficulty = params.get("difficulty") as DifficultyLevel | null;
    const status = params.get("status") as FilterStatus | null;
    const sort = params.get("sort") as SortOption | null;
    const view = params.get("view") as "grid" | "graph" | null;

    if (category) setSelectedCategory(category);
    if (difficulty) setSelectedDifficulty(difficulty);
    if (status) setFilterStatus(status);
    if (sort) setSortBy(sort);
    if (view) setViewMode(view);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedDifficulty !== "all")
      params.set("difficulty", selectedDifficulty);
    if (filterStatus !== "all") params.set("status", filterStatus);
    if (sortBy !== "default") params.set("sort", sortBy);
    if (viewMode !== "grid") params.set("view", viewMode);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [selectedCategory, selectedDifficulty, filterStatus, sortBy, viewMode]);

  const filteredAndSortedCards = useMemo(() => {
    let filtered = cards.filter(card => {
      if (selectedCategory !== "all" && card.category !== selectedCategory)
        return false;
      if (
        selectedDifficulty !== "all" &&
        card.difficulty !== selectedDifficulty
      )
        return false;

      const userState = getUserState(card.id);
      if (filterStatus === "favorite" && !userState.isFavorite) return false;
      if (filterStatus === "studied" && !userState.isStudied) return false;
      if (filterStatus === "unstudied" && userState.isStudied) return false;

      return true;
    });

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title, "zh-CN");
        case "difficulty": {
          const difficultyOrder = { base: 1, advance: 2, stretch: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        }
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    cards,
    selectedCategory,
    selectedDifficulty,
    filterStatus,
    sortBy,
    getUserState,
  ]);

  const handleCardClick = (cardId: string) => {
    setSelectedCardId(cardId);
    setDetailOpen(true);
  };

  const handleRelatedCardClick = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  const selectedCard = selectedCardId
    ? cards.find(c => c.id === selectedCardId) || null
    : null;
  const relatedCardsList = selectedCard
    ? getRelatedCards(selectedCard.id)
        .map(rel => {
          const relatedId =
            rel.source === selectedCard.id ? rel.target : rel.source;
          return cards.find(c => c.id === relatedId);
        })
        .filter((c): c is KnowledgeCard => c !== undefined)
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">知识卡片</h1>
          <p className="text-muted-foreground">
            探索设计理论、框架和方法，构建系统的设计知识体系
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Tabs
                value={selectedCategory}
                onValueChange={v =>
                  setSelectedCategory(v as KnowledgeCategory | "all")
                }
              >
                <TabsList>
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="theory">理论</TabsTrigger>
                  <TabsTrigger value="framework">框架</TabsTrigger>
                  <TabsTrigger value="lens">透镜</TabsTrigger>
                  <TabsTrigger value="method">方法</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Select
              value={selectedDifficulty}
              onValueChange={v =>
                setSelectedDifficulty(v as DifficultyLevel | "all")
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="难度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部难度</SelectItem>
                <SelectItem value="base">基础</SelectItem>
                <SelectItem value="advance">进阶</SelectItem>
                <SelectItem value="stretch">拓展</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filterStatus}
              onValueChange={v => setFilterStatus(v as FilterStatus)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="favorite">已收藏</SelectItem>
                <SelectItem value="studied">已学习</SelectItem>
                <SelectItem value="unstudied">未学习</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sortBy}
              onValueChange={v => setSortBy(v as SortOption)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">默认排序</SelectItem>
                <SelectItem value="title">按标题</SelectItem>
                <SelectItem value="difficulty">按难度</SelectItem>
                <SelectItem value="category">按分类</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                aria-label="网格视图"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "graph" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("graph")}
                aria-label="关系图谱"
              >
                <Network className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            共 {filteredAndSortedCards.length} 张卡片
            {filteredAndSortedCards.length !== cards.length && ` (已筛选)`}
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCards.map(card => {
              const userState = getUserState(card.id);
              return (
                <Card
                  key={card.id}
                  className="hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => handleCardClick(card.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(card.id);
                    }
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {card.title}
                        </CardTitle>
                      </div>
                      <div className="flex gap-1">
                        {userState.isFavorite && (
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        )}
                        {userState.isStudied && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {categoryLabels[card.category]}
                      </Badge>
                      <DifficultyBadge
                        level={card.difficulty}
                        className="text-xs"
                      />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {card.summary}
                    </p>

                    {card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {card.tags.slice(0, 3).map(tag => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {card.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{card.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <KnowledgeGraph
            cards={filteredAndSortedCards}
            relationships={relationships.filter(
              rel =>
                filteredAndSortedCards.some(c => c.id === rel.source) &&
                filteredAndSortedCards.some(c => c.id === rel.target)
            )}
            selectedCardId={selectedCardId || undefined}
            onCardSelect={handleCardClick}
          />
        )}

        {filteredAndSortedCards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              没有找到符合条件的知识卡片
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDifficulty("all");
                setFilterStatus("all");
              }}
            >
              清除筛选条件
            </Button>
          </div>
        )}
      </div>

      {selectedCard && (
        <KnowledgeCardDetail
          card={selectedCard}
          userState={getUserState(selectedCard.id)}
          open={detailOpen}
          onOpenChange={setDetailOpen}
          onToggleFavorite={() => toggleFavorite(selectedCard.id)}
          onToggleStudied={() => toggleStudied(selectedCard.id)}
          onRelatedCardClick={handleRelatedCardClick}
          relatedCards={relatedCardsList}
        />
      )}
    </div>
  );
}

export default KnowledgeOverview;

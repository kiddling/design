import { KnowledgeCard, UserCardState } from "@shared/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { DifficultyBadge } from "./ui/difficulty-badge";
import {
  Heart,
  Check,
  BookOpen,
  Lightbulb,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface KnowledgeCardDetailProps {
  card: KnowledgeCard | null;
  userState: UserCardState;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleFavorite: () => void;
  onToggleStudied: () => void;
  onRelatedCardClick: (cardId: string) => void;
  relatedCards: KnowledgeCard[];
}

const categoryLabels = {
  theory: "理论",
  framework: "框架",
  lens: "透镜",
  method: "方法",
};

export function KnowledgeCardDetail({
  card,
  userState,
  open,
  onOpenChange,
  onToggleFavorite,
  onToggleStudied,
  onRelatedCardClick,
  relatedCards,
}: KnowledgeCardDetailProps) {
  if (!card) return null;

  const tags = Array.isArray(card.tags) ? card.tags : [];
  const examples = Array.isArray(card.examples) ? card.examples : [];
  const applicationTips = Array.isArray(card.applicationTips) ? card.applicationTips : [];
  const recommendedReadings = Array.isArray((card as any).recommendedReadings) ? (card as any).recommendedReadings : [];
  const relatedList = Array.isArray(relatedCards) ? relatedCards : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{card.title}</DialogTitle>
              {card.titleEn && (
                <DialogDescription className="text-base">
                  {card.titleEn}
                </DialogDescription>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleFavorite}
                aria-label={userState.isFavorite ? "取消收藏" : "收藏"}
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    userState.isFavorite && "fill-red-500 text-red-500"
                  )}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleStudied}
                aria-label={
                  userState.isStudied ? "标记为未学习" : "标记为已学习"
                }
              >
                <Check
                  className={cn(
                    "h-5 w-5",
                    userState.isStudied && "text-green-500"
                  )}
                />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="secondary">{categoryLabels[card.category]}</Badge>
            <DifficultyBadge level={card.difficulty} />
            {userState.isStudied && (
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
              >
                ✓ 已学习
              </Badge>
            )}
            {tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <Tabs defaultValue="core" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="core">
              <BookOpen className="h-4 w-4 mr-2" />
              核心概念
            </TabsTrigger>
            <TabsTrigger value="examples">
              <Lightbulb className="h-4 w-4 mr-2" />
              案例
            </TabsTrigger>
            <TabsTrigger value="tips">应用技巧</TabsTrigger>
            <TabsTrigger value="resources">
              <LinkIcon className="h-4 w-4 mr-2" />
              资源
            </TabsTrigger>
          </TabsList>

          <TabsContent value="core" className="space-y-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">概述</h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.summary}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">核心理念</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="leading-relaxed">{card.coreIdea}</p>
              </div>
            </div>

            {card.mediaUrl && (
              <div className="rounded-lg overflow-hidden border">
                <img
                  src={card.mediaUrl}
                  alt={card.title}
                  className="w-full h-auto"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="examples" className="mt-4">
            <div className="space-y-3">
              {examples.length === 0 ? (
                <p className="text-sm text-muted-foreground">暂无案例示例。</p>
              ) : (
                examples.map((example, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 rounded-lg bg-muted/50 border"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="flex-1 text-sm leading-relaxed pt-1">
                      {example}
                    </p>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="mt-4">
            <div className="space-y-3">
              {applicationTips.length === 0 ? (
                <p className="text-sm text-muted-foreground">暂无应用技巧。</p>
              ) : (
                applicationTips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 rounded-lg bg-accent/5 border border-accent/20"
                  >
                    <Lightbulb className="flex-shrink-0 h-5 w-5 text-accent mt-0.5" />
                    <p className="flex-1 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-3">推荐阅读</h3>
                <div className="space-y-2">
                  {recommendedReadings.length === 0 ? (
                    <p className="text-sm text-muted-foreground">暂无推荐阅读资源。</p>
                  ) : (
                    recommendedReadings.map((reading: any, index: number) => (
                      <div
                        key={reading.id ?? index}
                        className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                      >
                        <div className="font-medium text-sm">{reading.title ?? "未命名资源"}</div>
                        {reading.author && (
                          <div className="text-xs text-muted-foreground mt-1">
                            作者：{reading.author}
                          </div>
                        )}
                        {reading.url && (
                          <a
                            href={reading.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline mt-1 inline-block"
                          >
                            查看链接 →
                          </a>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {relatedList.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-3">相关知识卡片</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {relatedList.map(relatedCard => (
                      <button
                        key={relatedCard.id}
                        onClick={() => onRelatedCardClick(relatedCard.id)}
                        className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors text-left"
                      >
                        <div className="font-medium text-sm mb-1">
                          {relatedCard.title}
                        </div>
                        <div className="flex gap-1.5">
                          <Badge variant="outline" className="text-xs">
                            {categoryLabels[relatedCard.category]}
                          </Badge>
                          <DifficultyBadge
                            level={relatedCard.difficulty}
                            className="text-xs"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

import { Copy, ExternalLink, Heart, Share2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { DifficultyBadge } from "./ui/difficulty-badge";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Case } from "@shared/types";
import { disciplineLabels } from "@shared/mock-data";

interface CaseDetailModalProps {
  case: Case | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleFavorite: (caseId: string) => void;
}

export function CaseDetailModal({
  case: caseItem,
  open,
  onOpenChange,
  onToggleFavorite,
}: CaseDetailModalProps) {
  if (!caseItem) return null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}/cases?id=${caseItem.id}`;
    navigator.clipboard.writeText(url);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/cases?id=${caseItem.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: caseItem.title,
          text: caseItem.keyInsight,
          url,
        });
      } catch (err) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader className="mb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <DialogTitle className="text-2xl mb-3">
                    {caseItem.title}
                  </DialogTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">
                      {disciplineLabels[caseItem.discipline]}
                    </Badge>
                    <DifficultyBadge difficulty={caseItem.difficulty} />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {caseItem.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={e => {
                      e.stopPropagation();
                      onToggleFavorite(caseItem.id);
                    }}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        caseItem.isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground"
                      )}
                    />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            {caseItem.imageUrl && (
              <div className="mb-6 aspect-video overflow-hidden rounded-lg">
                <img
                  src={caseItem.imageUrl}
                  alt={caseItem.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="space-y-6">
              <section>
                <h3 className="mb-2 text-lg font-semibold text-primary">
                  核心洞察 Key Insight
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {caseItem.keyInsight}
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold text-primary">
                  问题描述 Problem Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {caseItem.problem}
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold text-primary">
                  解构分析 Deconstruction Analysis
                </h3>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: caseItem.deconstruction.replace(/\n/g, "<br />"),
                  }}
                />
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold text-primary">
                  解决方案 Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {caseItem.solution}
                </p>
              </section>

              {caseItem.references.length > 0 && (
                <section>
                  <h3 className="mb-3 text-lg font-semibold text-primary">
                    参考资料 References
                  </h3>
                  <ul className="space-y-2">
                    {caseItem.references.map((ref, index) => (
                      <li key={index}>
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {ref.title}
                          <Badge variant="outline" className="text-xs">
                            {ref.type}
                          </Badge>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {caseItem.relatedKnowledge.length > 0 && (
                <section>
                  <h3 className="mb-3 text-lg font-semibold text-primary">
                    相关知识卡片 Related Knowledge
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.relatedKnowledge.map(knowledge => (
                      <Badge key={knowledge} variant="secondary">
                        {knowledge}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

import { useState, useMemo } from "react";
import {
  Copy,
  Heart,
  History,
  Plus,
  Search,
  Sparkles,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  promptTemplates,
  adaptationGuides,
  courseRecommendations,
} from "@shared/mockData";
import type { PromptTemplate, PromptTier, CustomPrompt } from "@shared/types";
import { PromptEditorDialog } from "@/components/PromptEditorDialog";
import { PromptHistory } from "@/components/PromptHistory";

const tierLabels: Record<PromptTier, string> = {
  beginner: "初级",
  intermediate: "进阶",
  advanced: "高级",
};

const tierColors: Record<PromptTier, string> = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  advanced:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
};

export function AIToolsPage() {
  const [selectedTier, setSelectedTier] = useState<PromptTier | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<PromptTemplate | null>(
    null
  );
  const [customPrompts, setCustomPrompts] = useState<CustomPrompt[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("course");

  const recommendedPromptIds = courseId
    ? courseRecommendations[courseId] || []
    : [];

  const filteredTemplates = useMemo(() => {
    return promptTemplates.filter(template => {
      const tierMatch =
        selectedTier === "all" || template.tier === selectedTier;
      const searchMatch =
        searchQuery === "" ||
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase());
      return tierMatch && searchMatch;
    });
  }, [selectedTier, searchQuery]);

  const recommendedTemplates = useMemo(() => {
    return promptTemplates.filter(template =>
      recommendedPromptIds.includes(template.id)
    );
  }, [recommendedPromptIds]);

  const copyToClipboard = async (template: PromptTemplate) => {
    const fullPrompt = `角色：${template.role}\n\n任务：${template.task}\n\n方法论：\n${template.methodology}\n\n期望输出：\n${template.expectedOutput}`;

    try {
      await navigator.clipboard.writeText(fullPrompt);
      toast.success("提示词已复制到剪贴板", {
        description: `已复制"${template.title}"`,
      });
    } catch (error) {
      toast.error("复制失败", {
        description: "请检查浏览器权限设置",
      });
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
        toast.info("已取消收藏");
      } else {
        newFavorites.add(id);
        toast.success("已添加到收藏");
      }
      return newFavorites;
    });
  };

  const handleSaveCustomPrompt = (prompt: CustomPrompt) => {
    setCustomPrompts(prev => {
      const existing = prev.find(p => p.id === prompt.id);
      if (existing) {
        return prev.map(p => (p.id === prompt.id ? prompt : p));
      }
      return [...prev, prompt];
    });
    toast.success("提示词已保存");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">AI助教提示词工具箱</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            专业的提示词模板库，帮助你更好地使用AI工具完成设计任务
          </p>
        </div>

        {courseId && recommendedTemplates.length > 0 && (
          <Card className="mb-6 border-accent bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-accent" />
                为当前课程推荐
              </CardTitle>
              <CardDescription>
                基于课程 {courseId.toUpperCase()}{" "}
                的学习内容，我们推荐以下提示词模板
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {recommendedTemplates.map(template => (
                  <PromptCard
                    key={template.id}
                    template={template}
                    isFavorite={favorites.has(template.id)}
                    onCopy={() => copyToClipboard(template)}
                    onFavorite={() => toggleFavorite(template.id)}
                    onEdit={() => setEditingPrompt(template)}
                    isRecommended
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="w-full sm:w-auto">
                  <TooltipProvider>
                    <ToggleGroup
                      type="single"
                      value={selectedTier}
                      onValueChange={value =>
                        setSelectedTier((value as PromptTier) || "all")
                      }
                      className="justify-start"
                    >
                      <ToggleGroupItem value="all" aria-label="显示全部">
                        全部
                      </ToggleGroupItem>
                      <ToggleGroupItem value="beginner" aria-label="初级模板">
                        初级
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="intermediate"
                        aria-label="进阶模板"
                      >
                        进阶
                      </ToggleGroupItem>
                      <ToggleGroupItem value="advanced" aria-label="高级模板">
                        高级
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </TooltipProvider>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingPrompt({} as PromptTemplate)}
                    className="flex-1 sm:flex-none"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    自定义
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex-1 sm:flex-none"
                  >
                    <History className="h-4 w-4 mr-2" />
                    历史
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索模板标题、标签或分类..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                  aria-label="搜索提示词模板"
                />
              </div>
            </div>

            {showHistory ? (
              <PromptHistory
                customPrompts={customPrompts}
                favorites={favorites}
                onEdit={prompt => {
                  const template = promptTemplates.find(
                    t => t.id === prompt.baseTemplateId
                  );
                  if (template) {
                    setEditingPrompt(template);
                  }
                }}
                onToggleFavorite={id => toggleFavorite(id)}
                onCopy={async prompt => {
                  try {
                    await navigator.clipboard.writeText(prompt.content);
                    toast.success("提示词已复制");
                  } catch {
                    toast.error("复制失败");
                  }
                }}
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredTemplates.map(template => (
                  <PromptCard
                    key={template.id}
                    template={template}
                    isFavorite={favorites.has(template.id)}
                    onCopy={() => copyToClipboard(template)}
                    onFavorite={() => toggleFavorite(template.id)}
                    onEdit={() => setEditingPrompt(template)}
                  />
                ))}
              </div>
            )}

            {!showHistory && filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">没有找到匹配的模板</p>
                <p className="text-sm text-muted-foreground mt-2">
                  尝试调整筛选条件或搜索关键词
                </p>
              </div>
            )}
          </div>

          <aside className="lg:w-80">
            <Card>
              <CardHeader>
                <CardTitle>适配指南</CardTitle>
                <CardDescription>
                  了解如何在不同AI工具中使用提示词
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {adaptationGuides.map((guide, index) => (
                    <AccordionItem key={index} value={`guide-${index}`}>
                      <AccordionTrigger>{guide.tool}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            {guide.description}
                          </p>
                          <div>
                            <h4 className="text-sm font-semibold mb-2">
                              适配技巧：
                            </h4>
                            <ul className="space-y-1 text-sm">
                              {guide.adaptationTips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex gap-2">
                                  <span className="text-accent">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-muted p-3 rounded-md">
                            <h4 className="text-sm font-semibold mb-2">
                              示例：
                            </h4>
                            <code className="text-xs whitespace-pre-wrap break-words">
                              {guide.exampleOutput}
                            </code>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {editingPrompt && (
        <PromptEditorDialog
          template={editingPrompt}
          isOpen={!!editingPrompt}
          onClose={() => setEditingPrompt(null)}
          onSave={handleSaveCustomPrompt}
        />
      )}
    </div>
  );
}

interface PromptCardProps {
  template: PromptTemplate;
  isFavorite: boolean;
  onCopy: () => void;
  onFavorite: () => void;
  onEdit: () => void;
  isRecommended?: boolean;
}

function PromptCard({
  template,
  isFavorite,
  onCopy,
  onFavorite,
  onEdit,
  isRecommended,
}: PromptCardProps) {
  return (
    <Card className={isRecommended ? "border-accent" : ""}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{template.title}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className={tierColors[template.tier]}>
                {tierLabels[template.tier]}
              </Badge>
              <Badge variant="secondary">{template.category}</Badge>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onFavorite}
                  aria-label={isFavorite ? "取消收藏" : "收藏"}
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isFavorite ? "取消收藏" : "收藏"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-semibold">角色：</span>
            <p className="text-muted-foreground mt-1">{template.role}</p>
          </div>
          <div>
            <span className="font-semibold">任务：</span>
            <p className="text-muted-foreground mt-1">{template.task}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {template.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={onCopy} className="flex-1" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            复制
          </Button>
          <Button onClick={onEdit} variant="outline" size="sm">
            编辑
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

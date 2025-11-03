import { useState, useMemo } from "react";
import { Clock, Copy, Edit, Heart, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { CustomPrompt, PromptTier } from "@shared/types";

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

interface PromptHistoryProps {
  customPrompts: CustomPrompt[];
  favorites: Set<string>;
  onEdit: (prompt: CustomPrompt) => void;
  onToggleFavorite: (id: string) => void;
  onCopy: (prompt: CustomPrompt) => void;
}

export function PromptHistory({
  customPrompts,
  favorites,
  onEdit,
  onToggleFavorite,
  onCopy,
}: PromptHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTier, setFilterTier] = useState<
    PromptTier | "all" | "favorites"
  >("all");

  const filteredPrompts = useMemo(() => {
    let prompts = [...customPrompts].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    if (filterTier === "favorites") {
      prompts = prompts.filter(p => favorites.has(p.id));
    } else if (filterTier !== "all") {
      prompts = prompts.filter(p => p.tier === filterTier);
    }

    if (searchQuery) {
      prompts = prompts.filter(
        p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some(tag =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          p.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return prompts;
  }, [customPrompts, favorites, filterTier, searchQuery]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}分钟前`;
    } else if (diffHours < 24) {
      return `${diffHours}小时前`;
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索历史记录..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label="搜索历史记录"
          />
        </div>
        <ToggleGroup
          type="single"
          value={filterTier}
          onValueChange={value =>
            setFilterTier((value as typeof filterTier) || "all")
          }
          className="justify-start"
        >
          <ToggleGroupItem value="all">全部</ToggleGroupItem>
          <ToggleGroupItem value="favorites">
            <Heart className="h-4 w-4 mr-1" />
            收藏
          </ToggleGroupItem>
          <ToggleGroupItem value="beginner">初级</ToggleGroupItem>
          <ToggleGroupItem value="intermediate">进阶</ToggleGroupItem>
          <ToggleGroupItem value="advanced">高级</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {filteredPrompts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {customPrompts.length === 0
                ? "还没有保存的提示词"
                : "没有找到匹配的记录"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {customPrompts.length === 0
                ? "开始创建或编辑模板来保存您的提示词"
                : "尝试调整筛选条件"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredPrompts.map(prompt => (
            <Card key={prompt.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-base">{prompt.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(prompt.updatedAt)}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onToggleFavorite(prompt.id)}
                    aria-label={favorites.has(prompt.id) ? "取消收藏" : "收藏"}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.has(prompt.id)
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {prompt.content}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={tierColors[prompt.tier]}
                    >
                      {tierLabels[prompt.tier]}
                    </Badge>
                    {prompt.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {prompt.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{prompt.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCopy(prompt)}
                      className="flex-1"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      复制
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(prompt)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

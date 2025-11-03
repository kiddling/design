import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { z } from "zod";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { PromptTemplate, CustomPrompt, PromptTier } from "@shared/types";

const customPromptSchema = z.object({
  title: z.string().min(1, "标题不能为空").max(100, "标题过长"),
  content: z.string().min(10, "内容至少需要10个字符").max(5000, "内容过长"),
  tags: z.array(z.string()).max(10, "标签数量不能超过10个"),
  tier: z.enum(["beginner", "intermediate", "advanced"]),
});

interface PromptEditorDialogProps {
  template?: PromptTemplate;
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: CustomPrompt) => void;
}

export function PromptEditorDialog({
  template,
  isOpen,
  onClose,
  onSave,
}: PromptEditorDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [tier, setTier] = useState<PromptTier>("beginner");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (template && template.id) {
      setTitle(template.title);
      const fullContent = `角色：${template.role}\n\n任务：${template.task}\n\n方法论：\n${template.methodology}\n\n期望输出：\n${template.expectedOutput}`;
      setContent(fullContent);
      setTags(template.tags || []);
      setTier(template.tier);
    } else {
      setTitle("");
      setContent("");
      setTags([]);
      setTier("beginner");
    }
    setErrors({});
  }, [template, isOpen]);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    try {
      const validatedData = customPromptSchema.parse({
        title,
        content,
        tags,
        tier,
      });

      const customPrompt: CustomPrompt = {
        id: nanoid(),
        title: validatedData.title,
        content: validatedData.content,
        tags: validatedData.tags,
        tier: validatedData.tier,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        baseTemplateId: template?.id,
      };

      onSave(customPrompt);
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: Record<string, string> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            errorMap[err.path[0].toString()] = err.message;
          }
        });
        setErrors(errorMap);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {template?.id ? "编辑提示词" : "创建自定义提示词"}
          </DialogTitle>
          <DialogDescription>
            {template?.id
              ? "基于模板创建您的自定义版本，可以添加标签和调整内容"
              : "从头开始创建全新的提示词模板"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">标题 *</Label>
            <Input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="为您的提示词起一个清晰的标题"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <p id="title-error" className="text-sm text-destructive">
                {errors.title}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tier">难度等级</Label>
            <ToggleGroup
              type="single"
              value={tier}
              onValueChange={value => value && setTier(value as PromptTier)}
              className="justify-start"
            >
              <ToggleGroupItem value="beginner">初级</ToggleGroupItem>
              <ToggleGroupItem value="intermediate">进阶</ToggleGroupItem>
              <ToggleGroupItem value="advanced">高级</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">提示词内容 *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="输入完整的提示词内容，包括角色、任务、方法论和期望输出..."
              rows={12}
              aria-invalid={!!errors.content}
              aria-describedby={errors.content ? "content-error" : undefined}
            />
            {errors.content && (
              <p id="content-error" className="text-sm text-destructive">
                {errors.content}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {content.length} / 5000 字符
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">标签</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="添加标签（按Enter确认）"
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>
                添加
              </Button>
            </div>
            {errors.tags && (
              <p className="text-sm text-destructive">{errors.tags}</p>
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:bg-destructive/20 rounded-full"
                      aria-label={`删除标签 ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              已添加 {tags.length} / 10 个标签
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSave}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

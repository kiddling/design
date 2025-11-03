import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import type { WorkflowStep } from "@shared/types/workflow";
import { cn } from "@/lib/utils";

interface StepContentProps {
  step: WorkflowStep;
  completedItems: string[];
  onChecklistToggle: (itemId: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function StepContent({
  step,
  completedItems,
  onChecklistToggle,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: StepContentProps) {
  const completedCount = step.checklist.filter((item) =>
    completedItems.includes(item.id)
  ).length;
  const totalCount = step.checklist.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge>第 {step.order} 步</Badge>
                <CardTitle className="text-2xl">{step.title}</CardTitle>
              </div>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {completedCount}/{totalCount}
              </div>
              <p className="text-xs text-muted-foreground">已完成</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">学习指导</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{step.guidance}</p>
        </CardContent>
      </Card>

      {step.media && step.media.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">参考资料</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.media.map((media, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    {media.type === "image" ? (
                      <img
                        src={media.src}
                        alt={media.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <video
                        src={media.src}
                        controls
                        className="w-full h-full"
                        aria-label={media.alt}
                      >
                        您的浏览器不支持视频播放。
                      </video>
                    )}
                  </div>
                  {media.caption && (
                    <p className="text-sm text-muted-foreground text-center">
                      {media.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">任务清单</CardTitle>
          <div className="mt-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`任务完成进度：${Math.round(progressPercentage)}%`}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {step.checklist.map((item) => {
              const isCompleted = completedItems.includes(item.id);
              return (
                <li
                  key={item.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border transition-colors",
                    isCompleted
                      ? "bg-primary/5 border-primary/20"
                      : "hover:bg-muted/50"
                  )}
                >
                  <Checkbox
                    id={item.id}
                    checked={isCompleted}
                    onCheckedChange={() => onChecklistToggle(item.id)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor={item.id}
                    className={cn(
                      "flex-1 text-sm cursor-pointer",
                      isCompleted && "text-muted-foreground line-through"
                    )}
                  >
                    {item.text}
                  </label>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between pt-4">
        <Button
          onClick={onPrevious}
          disabled={!hasPrevious}
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          上一步
        </Button>
        <Button
          onClick={onNext}
          disabled={!hasNext}
          className="gap-2"
        >
          下一步
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

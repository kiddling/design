import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressMeterProps {
  overallProgress: number;
  completedSteps: number;
  totalSteps: number;
  usedTools: number;
  totalTools: number;
  completedChecklists: number;
  totalChecklists: number;
}

export function ProgressMeter({
  overallProgress,
  completedSteps,
  totalSteps,
  usedTools,
  totalTools,
  completedChecklists,
  totalChecklists,
}: ProgressMeterProps) {
  const metrics = [
    {
      label: "完成步骤",
      current: completedSteps,
      total: totalSteps,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      label: "清单项目",
      current: completedChecklists,
      total: totalChecklists,
      icon: Circle,
      color: "text-blue-500",
    },
    {
      label: "使用工具",
      current: usedTools,
      total: totalTools,
      icon: Target,
      color: "text-orange-500",
    },
  ];

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">整体进度</h3>
            <span className="text-2xl font-bold text-primary">
              {overallProgress}%
            </span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {overallProgress === 100
              ? "🎉 恭喜完成所有任务！"
              : overallProgress >= 75
                ? "快完成了，加油！"
                : overallProgress >= 50
                  ? "进展顺利，继续努力"
                  : overallProgress >= 25
                    ? "良好的开端"
                    : "开始你的学习之旅"}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            详细统计
          </h4>
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const percentage = (metric.current / metric.total) * 100;

            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("w-4 h-4", metric.color)} />
                    <span>{metric.label}</span>
                  </div>
                  <span className="font-medium">
                    {metric.current} / {metric.total}
                  </span>
                </div>
                <Progress value={percentage} className="h-1.5" />
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">权重分配</span>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>步骤完成度</span>
              <span>40%</span>
            </div>
            <div className="flex justify-between">
              <span>清单完成度</span>
              <span>40%</span>
            </div>
            <div className="flex justify-between">
              <span>工具使用度</span>
              <span>20%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

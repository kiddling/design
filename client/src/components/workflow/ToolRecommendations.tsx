import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  CheckCircle2,
  Palette,
  Image,
  Layers,
  Figma as FigmaIcon,
} from "lucide-react";
import type { ToolRecommendation } from "@shared/types/workflow";
import { cn } from "@/lib/utils";

interface ToolRecommendationsProps {
  tools: ToolRecommendation[];
  usedTools: string[];
  onToolUse: (toolId: string) => void;
}

const iconMap: Record<string, any> = {
  Palette: Palette,
  Image: Image,
  Layers: Layers,
  Figma: FigmaIcon,
};

export function ToolRecommendations({
  tools,
  usedTools,
  onToolUse,
}: ToolRecommendationsProps) {
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const handleToolClick = (toolId: string, url: string) => {
    onToolUse(toolId);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">推荐工具</h2>
        <p className="text-muted-foreground mt-1">
          精选数字工具助力你的创作流程
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => {
          const Icon = iconMap[tool.icon] || Palette;
          const isUsed = usedTools.includes(tool.id);
          const isExpanded = expandedTool === tool.id;

          return (
            <Card
              key={tool.id}
              className={cn(
                "transition-all duration-300 hover:shadow-lg",
                isUsed && "ring-2 ring-primary/20"
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                  {isUsed && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() =>
                      setExpandedTool(isExpanded ? null : tool.id)
                    }
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {isExpanded ? "收起详情" : "查看详情"}
                  </button>

                  {isExpanded && (
                    <div className="space-y-3 pt-2 animate-in slide-in-from-top-2">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">使用说明</h4>
                        <p className="text-sm text-muted-foreground">
                          {tool.summary}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2">快速提示</h4>
                        <ul className="space-y-1">
                          {tool.quickTips.map((tip, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="text-primary mt-0.5">→</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => handleToolClick(tool.id, tool.url)}
                  className="w-full gap-2"
                  variant={isUsed ? "outline" : "default"}
                >
                  {isUsed ? "再次使用" : "开始使用"}
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

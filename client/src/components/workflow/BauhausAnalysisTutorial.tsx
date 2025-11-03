import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AnalysisElement {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  connections?: string[];
}

export function BauhausAnalysisTutorial() {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const physicalElements: AnalysisElement[] = [
    {
      id: "point",
      label: "点",
      description: "视觉焦点，最小的形态单位，具有位置但无方向",
      x: 150,
      y: 100,
      connections: ["line"],
    },
    {
      id: "line",
      label: "线",
      description: "点的轨迹，具有长度和方向，连接空间",
      x: 300,
      y: 150,
      connections: ["point", "plane"],
    },
    {
      id: "plane",
      label: "面",
      description: "线的移动轨迹，具有长宽，定义空间边界",
      x: 450,
      y: 100,
      connections: ["line", "volume"],
    },
    {
      id: "volume",
      label: "体",
      description: "面的延伸，具有三维特征，创造空间",
      x: 300,
      y: 250,
      connections: ["plane"],
    },
  ];

  const forceFieldElements: AnalysisElement[] = [
    {
      id: "center",
      label: "视觉中心",
      description: "吸引注意力最强的区域",
      x: 300,
      y: 180,
      connections: ["accent1", "accent2"],
    },
    {
      id: "accent1",
      label: "次要焦点",
      description: "辅助视觉中心的元素",
      x: 150,
      y: 120,
      connections: ["center"],
    },
    {
      id: "accent2",
      label: "次要焦点",
      description: "辅助视觉中心的元素",
      x: 450,
      y: 120,
      connections: ["center"],
    },
    {
      id: "balance",
      label: "平衡区域",
      description: "维持画面稳定的空间",
      x: 300,
      y: 300,
      connections: [],
    },
  ];

  const renderAnalysisSVG = (elements: AnalysisElement[], type: string) => {
    const activeElement = hoveredElement || selectedElement;
    const activeData = elements.find((el) => el.id === activeElement);

    return (
      <div className="space-y-4">
        <svg
          viewBox="0 0 600 400"
          className="w-full h-auto border rounded-lg bg-muted/20"
          role="img"
          aria-label={`${type === "physical" ? "物理分解" : "力场分析"}示意图`}
        >
          {elements.map((element) => {
            const isActive = activeElement === element.id;
            const isConnected =
              activeData?.connections?.includes(element.id) || false;

            return (
              <g key={element.id}>
                {element.connections?.map((connId) => {
                  const target = elements.find((el) => el.id === connId);
                  if (!target) return null;

                  return (
                    <line
                      key={`${element.id}-${connId}`}
                      x1={element.x}
                      y1={element.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={
                        isActive || isConnected
                          ? "hsl(var(--primary))"
                          : "hsl(var(--muted-foreground))"
                      }
                      strokeWidth={isActive || isConnected ? 3 : 1}
                      opacity={isActive || isConnected ? 0.8 : 0.3}
                      className="transition-all duration-300"
                      aria-hidden="true"
                    />
                  );
                })}

                <circle
                  cx={element.x}
                  cy={element.y}
                  r={isActive ? 40 : isConnected ? 35 : 30}
                  fill={
                    isActive
                      ? "hsl(var(--primary))"
                      : "hsl(var(--primary) / 0.2)"
                  }
                  stroke="hsl(var(--primary))"
                  strokeWidth={isActive ? 3 : 2}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredElement(element.id)}
                  onMouseLeave={() => setHoveredElement(null)}
                  onClick={() =>
                    setSelectedElement(
                      selectedElement === element.id ? null : element.id
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedElement(
                        selectedElement === element.id ? null : element.id
                      );
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${element.label}: ${element.description}`}
                  aria-pressed={selectedElement === element.id}
                />

                <text
                  x={element.x}
                  y={element.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={
                    isActive
                      ? "hsl(var(--primary-foreground))"
                      : "hsl(var(--foreground))"
                  }
                  className="text-sm font-semibold pointer-events-none"
                  aria-hidden="true"
                >
                  {element.label}
                </text>
              </g>
            );
          })}
        </svg>

        <div
          className="min-h-[80px] p-4 bg-muted/50 rounded-lg"
          role="status"
          aria-live="polite"
        >
          {activeData ? (
            <div>
              <Badge className="mb-2">{activeData.label}</Badge>
              <p className="text-sm text-muted-foreground">
                {activeData.description}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center">
              悬停或点击节点查看详细说明
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">包豪斯分析方法</h2>
        <p className="text-muted-foreground mt-1">
          交互式视觉教程：理解设计的基本原理
        </p>
      </div>

      <Tabs defaultValue="physical" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="physical">物理分解</TabsTrigger>
          <TabsTrigger value="force-field">力场分析</TabsTrigger>
        </TabsList>

        <TabsContent value="physical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>物理分解分析</CardTitle>
              <p className="text-sm text-muted-foreground">
                将复杂的视觉形象分解为基本几何元素
              </p>
            </CardHeader>
            <CardContent>
              {renderAnalysisSVG(physicalElements, "physical")}

              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-sm">分析步骤</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">1.</span>
                    <span>
                      识别画面中的点元素（视觉焦点、孤立物体）
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">2.</span>
                    <span>
                      标注线元素（边缘、轮廓、连接路径）
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">3.</span>
                    <span>
                      区分面元素（形状、色块、空间区域）
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">4.</span>
                    <span>
                      理解体元素（立体感、纵深、空间）
                    </span>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="force-field" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>力场分析</CardTitle>
              <p className="text-sm text-muted-foreground">
                分析视觉吸引力的分布和流动
              </p>
            </CardHeader>
            <CardContent>
              {renderAnalysisSVG(forceFieldElements, "force-field")}

              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-sm">分析步骤</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">1.</span>
                    <span>
                      确定视觉中心（最吸引注意力的位置）
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">2.</span>
                    <span>
                      标注次要焦点（辅助吸引视线的元素）
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">3.</span>
                    <span>
                      绘制视线流动路径（眼睛移动的轨迹）
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold">4.</span>
                    <span>
                      识别平衡区域（稳定画面的空白或平静区域）
                    </span>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-medium">键盘导航支持</p>
              <p className="text-xs text-muted-foreground">
                使用 Tab 键在节点间移动，按 Enter 或 Space 选择节点，Esc 取消选择
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { KnowledgeCard, CardRelationship } from "@shared/types";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface KnowledgeGraphProps {
  cards: KnowledgeCard[];
  relationships: CardRelationship[];
  selectedCardId?: string;
  onCardSelect: (cardId: string) => void;
  className?: string;
}

interface NodePosition {
  x: number;
  y: number;
  id: string;
  card: KnowledgeCard;
}

export function KnowledgeGraph({
  cards,
  relationships,
  selectedCardId,
  onCardSelect,
  className,
}: KnowledgeGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<NodePosition[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.35;

    const positions: NodePosition[] = cards.map((card, index) => {
      const angle = (index / cards.length) * 2 * Math.PI - Math.PI / 2;
      return {
        id: card.id,
        card,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    setNodes(positions);
  }, [cards]);

  const getRelatedNodes = (cardId: string): Set<string> => {
    const related = new Set<string>();
    relationships.forEach(rel => {
      if (rel.from === cardId) related.add(rel.to);
      if (rel.to === cardId) related.add(rel.from);
    });
    return related;
  };

  const isHighlighted = (nodeId: string) => {
    if (!selectedCardId && !hoveredNode) return true;
    const activeId = selectedCardId || hoveredNode;
    if (nodeId === activeId) return true;
    return getRelatedNodes(activeId || "").has(nodeId);
  };

  const getRelationshipType = (from: string, to: string) => {
    const rel = relationships.find(
      r => (r.from === from && r.to === to) || (r.from === to && r.to === from)
    );
    return rel?.type;
  };

  return (
    <div
      className={cn(
        "relative w-full h-[600px] bg-muted/30 rounded-lg border",
        className
      )}
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        role="img"
        aria-label="知识卡片关系图谱"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3, 0 6"
              fill="currentColor"
              className="text-muted-foreground"
            />
          </marker>
        </defs>

        <g className="relationships">
          {nodes.map(fromNode => {
            const relatedIds = getRelatedNodes(fromNode.id);
            return Array.from(relatedIds).map(toId => {
              const toNode = nodes.find(n => n.id === toId);
              if (!toNode) return null;

              const highlighted =
                isHighlighted(fromNode.id) && isHighlighted(toNode.id);
              const relType = getRelationshipType(fromNode.id, toNode.id);

              return (
                <g key={`${fromNode.id}-${toNode.id}`}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="currentColor"
                    strokeWidth={highlighted ? 2 : 1}
                    className={cn(
                      "transition-all",
                      highlighted ? "text-primary" : "text-muted-foreground/30"
                    )}
                    markerEnd={
                      relType === "prerequisite" ? "url(#arrowhead)" : undefined
                    }
                    strokeDasharray={relType === "related" ? "5,5" : undefined}
                  />
                </g>
              );
            });
          })}
        </g>

        <g className="nodes">
          {nodes.map(node => {
            const highlighted = isHighlighted(node.id);
            const isActive = node.id === selectedCardId;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onClick={() => onCardSelect(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                role="button"
                tabIndex={0}
                aria-label={`选择 ${node.card.title}`}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onCardSelect(node.id);
                  }
                }}
              >
                <circle
                  r={isActive ? 50 : 40}
                  fill="currentColor"
                  className={cn(
                    "transition-all",
                    highlighted
                      ? isActive
                        ? "text-accent"
                        : "text-primary"
                      : "text-muted"
                  )}
                  opacity={highlighted ? 1 : 0.3}
                />
                <circle
                  r={isActive ? 48 : 38}
                  fill="currentColor"
                  className="text-background"
                />
                <text
                  textAnchor="middle"
                  dy="0.3em"
                  className={cn(
                    "text-xs font-medium fill-current pointer-events-none",
                    highlighted ? "text-foreground" : "text-muted-foreground"
                  )}
                  style={{ fontSize: isActive ? "11px" : "10px" }}
                >
                  {node.card.title.length > 8
                    ? node.card.title.slice(0, 7) + "…"
                    : node.card.title}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-0.5 bg-primary"></div>
          <span>直接关联</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-8 h-0.5 bg-primary"
            style={{ strokeDasharray: "3,3" }}
          ></div>
          <span>相关主题</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="32" height="8" className="text-primary">
            <line
              x1="0"
              y1="4"
              x2="28"
              y2="4"
              stroke="currentColor"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          </svg>
          <span>前置知识</span>
        </div>
      </div>

      {(selectedCardId || hoveredNode) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-4 right-4 bg-card/95 backdrop-blur-sm border rounded-lg p-4 shadow-lg"
        >
          {(() => {
            const activeCard = cards.find(
              c => c.id === (selectedCardId || hoveredNode)
            );
            if (!activeCard) return null;

            const related = relationships.filter(
              rel => rel.from === activeCard.id || rel.to === activeCard.id
            );

            return (
              <>
                <h4 className="font-semibold text-sm mb-1">
                  {activeCard.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {activeCard.summary}
                </p>
                {related.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {related.map((rel, idx) => {
                      const otherId =
                        rel.from === activeCard.id ? rel.to : rel.from;
                      const otherCard = cards.find(c => c.id === otherId);
                      if (!otherCard) return null;

                      return (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {rel.type === "prerequisite" && "📚 "}
                          {rel.type === "related" && "🔗 "}
                          {rel.type === "application" && "🎯 "}
                          {otherCard.title}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}

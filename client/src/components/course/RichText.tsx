import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { ContentBlock } from "@shared/types/course";

interface RichTextProps {
  blocks: ContentBlock[];
}

export function RichText({ blocks }: RichTextProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <ContentBlockRenderer key={index} block={block} />
      ))}
    </div>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "text":
      return <TextBlockRenderer block={block} />;
    case "image":
      return <ImageBlockRenderer block={block} />;
    case "quote":
      return <QuoteBlockRenderer block={block} />;
    case "callout":
      return <CalloutBlockRenderer block={block} />;
    case "list":
      return <ListBlockRenderer block={block} />;
    case "tabs":
      return <TabsBlockRenderer block={block} />;
    case "timeline":
      return <TimelineBlockRenderer block={block} />;
    case "card-grid":
      return <CardGridBlockRenderer block={block} />;
    default:
      return null;
  }
}

function TextBlockRenderer({ block }: { block: Extract<ContentBlock, { type: "text" }> }) {
  const { content, format = "paragraph" } = block;
  
  if (format === "heading") {
    return <h2 className="text-3xl font-bold tracking-tight mb-4">{content}</h2>;
  }
  
  if (format === "subheading") {
    return <h3 className="text-xl font-semibold mb-3">{content}</h3>;
  }
  
  return <p className="text-muted-foreground leading-7">{content}</p>;
}

function ImageBlockRenderer({ block }: { block: Extract<ContentBlock, { type: "image" }> }) {
  return (
    <figure className="space-y-2">
      <img
        src={block.src}
        alt={block.alt}
        className="rounded-lg w-full object-cover"
        loading="lazy"
        width={block.width}
        height={block.height}
      />
      {block.caption && (
        <figcaption className="text-sm text-muted-foreground text-center">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

function QuoteBlockRenderer({ block }: { block: Extract<ContentBlock, { type: "quote" }> }) {
  return (
    <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic">
      <p className="text-lg text-foreground mb-2">{block.content}</p>
      {(block.author || block.source) && (
        <footer className="text-sm text-muted-foreground">
          {block.author && <cite className="not-italic font-medium">{block.author}</cite>}
          {block.author && block.source && " · "}
          {block.source && <span>{block.source}</span>}
        </footer>
      )}
    </blockquote>
  );
}

function CalloutBlockRenderer({ block }: { block: Extract<ContentBlock, { type: "callout" }> }) {
  const variants = {
    info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100",
    success: "bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100",
    tip: "bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-100",
  };
  
  const icons = {
    info: Icons.Info,
    warning: Icons.AlertTriangle,
    success: Icons.CheckCircle2,
    tip: Icons.Lightbulb,
  };
  
  const Icon = icons[block.variant];
  
  return (
    <div className={cn("border rounded-lg p-4", variants[block.variant])}>
      <div className="flex gap-3">
        <Icon className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="space-y-1">
          {block.title && <div className="font-semibold">{block.title}</div>}
          <div className="text-sm leading-relaxed">{block.content}</div>
        </div>
      </div>
    </div>
  );
}

function ListBlockRenderer({ block }: { block: Extract<ContentBlock, { type: "list" }> }) {
  const ListTag = block.ordered ? "ol" : "ul";
  
  return (
    <ListTag className={cn("space-y-2 pl-6", block.ordered ? "list-decimal" : "list-disc")}>
      {block.items.map((item, index) => (
        <li key={index} className="text-muted-foreground leading-7">
          {item}
        </li>
      ))}
    </ListTag>
  );
}

function TabsBlockRenderer({ block }: { block: Extract<ContentBlock, { type: "tabs" }> }) {
  return (
    <Tabs defaultValue={block.tabs[0]?.id} className="w-full">
      <TabsList className="w-full justify-start flex-wrap h-auto">
        {block.tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {block.tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="space-y-4">
          <RichText blocks={tab.content} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function TimelineBlockRenderer({ block }: { block: Extract<ContentBlock, { type: "timeline" }> }) {
  return (
    <div className="space-y-6">
      {block.steps.map((step, index) => {
        const IconComponent = step.icon && (Icons as any)[step.icon] ? (Icons as any)[step.icon] : Icons.Circle;
        
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <IconComponent className="h-5 w-5" />
              </div>
              {index < block.steps.length - 1 && (
                <div className="w-0.5 flex-1 bg-border mt-2" />
              )}
            </div>
            <div className="flex-1 pb-8">
              <h4 className="font-semibold mb-1">{step.label}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function CardGridBlockRenderer({ block }: { block: Extract<ContentBlock, { type: "card-grid" }> }) {
  const columns = block.columns || 3;
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns] || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  
  return (
    <div className={cn("grid gap-4", gridCols)}>
      {block.cards.map((card) => (
        <Card key={card.id} className="hover:shadow-lg transition-shadow">
          {card.image && (
            <div className="aspect-video overflow-hidden rounded-t-xl">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <CardContent className="p-4">
            <CardTitle className="text-base mb-2">{card.title}</CardTitle>
            <CardDescription className="text-sm">
              {card.description}
            </CardDescription>
            {card.tags && card.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {card.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {card.link && (
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline mt-2 inline-block"
              >
                了解更多 →
              </a>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

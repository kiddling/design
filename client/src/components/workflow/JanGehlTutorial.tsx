import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Eye, MapPin, Move, Save, Cloud } from "lucide-react";
import type { JanGehlStage } from "@shared/types/workflow";
import { cn } from "@/lib/utils";

interface JanGehlTutorialProps {
  stages: JanGehlStage[];
  onNoteSave?: (stageId: string, note: string) => void;
}

const stageIcons = {
  counting: Eye,
  mapping: MapPin,
  tracking: Move,
};

export function JanGehlTutorial({ stages, onNoteSave }: JanGehlTutorialProps) {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [syncEnabled, setSyncEnabled] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("jan-gehl-notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse saved notes:", e);
      }
    }
  }, []);

  const handleNoteChange = (stageId: string, value: string) => {
    const updatedNotes = { ...notes, [stageId]: value };
    setNotes(updatedNotes);
    localStorage.setItem("jan-gehl-notes", JSON.stringify(updatedNotes));

    if (syncEnabled && onNoteSave) {
      onNoteSave(stageId, value);
    }
  };

  const handleSyncToggle = (checked: boolean) => {
    setSyncEnabled(checked);
    if (checked && onNoteSave) {
      Object.entries(notes).forEach(([stageId, note]) => {
        onNoteSave(stageId, note);
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">简·盖尔观察方法</h2>
          <p className="text-muted-foreground mt-1">
            三阶段系统性观察城市空间
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">云端同步</span>
          <Switch checked={syncEnabled} onCheckedChange={handleSyncToggle} />
          {syncEnabled ? (
            <Cloud className="w-4 h-4 text-primary" />
          ) : (
            <Save className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {stages.map((stage, index) => {
          const Icon = stageIcons[stage.id as keyof typeof stageIcons] || Eye;
          return (
            <AccordionItem
              key={stage.id}
              value={stage.id}
              className="border rounded-lg px-6"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">阶段 {index + 1}</Badge>
                      <h3 className="font-semibold">{stage.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6 pt-4">
                  <div className="prose prose-sm max-w-none">
                    <p>{stage.content}</p>
                  </div>

                  {stage.examples.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">示例图片</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stage.examples.map((example, idx) => (
                          <Card key={idx}>
                            <CardContent className="p-4">
                              <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-2">
                                <img
                                  src={example.src}
                                  alt={example.alt}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              {example.caption && (
                                <p className="text-xs text-muted-foreground text-center">
                                  {example.caption}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {stage.tips.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">实用提示</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {stage.tips.map((tip, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">我的笔记</h4>
                      <span className="text-xs text-muted-foreground">
                        (自动保存到本地)
                      </span>
                    </div>
                    <Textarea
                      placeholder={`在这里记录你在"${stage.title}"阶段的观察笔记...`}
                      value={notes[stage.id] || ""}
                      onChange={(e) => handleNoteChange(stage.id, e.target.value)}
                      className="min-h-[120px]"
                      aria-label={`${stage.title} 笔记`}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

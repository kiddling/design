import { useState } from "react";
import { ExternalLink, Copy, FileText, Check } from "lucide-react";
import { Resource, ReadingState } from "../../../shared/types/resource";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ResourceCardProps {
  resource: Resource;
  readingState: ReadingState;
  notes: string;
  onStateChange: (state: ReadingState) => void;
  onNotesChange: (notes: string) => void;
}

const stateOptions: ReadingState[] = ["未读", "想读", "在读", "已读"];

export function ResourceCard({
  resource,
  readingState,
  notes,
  onStateChange,
  onNotesChange,
}: ResourceCardProps) {
  const [copied, setCopied] = useState(false);
  const [localNotes, setLocalNotes] = useState(notes);
  const [notesOpen, setNotesOpen] = useState(false);

  const handleCopyCitation = async () => {
    const citation = `${resource.author}, 《${resource.title}》, ${resource.year}`;
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNotes = () => {
    onNotesChange(localNotes);
    setNotesOpen(false);
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{resource.title}</CardTitle>
          <a
            href={resource.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
            aria-label={`Open external link for ${resource.title}`}
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
        <CardDescription>
          {resource.author} · {resource.year}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{resource.summary}</p>
          <div className="pt-2">
            <p className="text-sm font-medium mb-1">推荐理由：</p>
            <p className="text-sm text-muted-foreground">
              {resource.recommendationReason}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {resource.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 pt-4 border-t">
        <div className="w-full">
          <p className="text-xs text-muted-foreground mb-2">阅读状态</p>
          <ToggleGroup
            type="single"
            value={readingState}
            onValueChange={value => {
              if (value) onStateChange(value as ReadingState);
            }}
            className="justify-start w-full flex-wrap"
          >
            {stateOptions.map(state => (
              <ToggleGroupItem
                key={state}
                value={state}
                aria-label={`Mark as ${state}`}
                className="flex-1 min-w-[60px]"
              >
                {state}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCitation}
            className="flex-1"
            aria-label="Copy citation"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "已复制" : "复制引用"}
          </Button>

          <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                aria-label="Edit notes"
              >
                <FileText className="h-4 w-4" />
                {notes ? "编辑笔记" : "添加笔记"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{resource.title}</DialogTitle>
                <DialogDescription>添加您的阅读笔记和想法</DialogDescription>
              </DialogHeader>
              <Textarea
                value={localNotes}
                onChange={e => setLocalNotes(e.target.value)}
                placeholder="输入笔记..."
                className="min-h-[200px]"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setLocalNotes(notes);
                    setNotesOpen(false);
                  }}
                >
                  取消
                </Button>
                <Button onClick={handleSaveNotes}>保存</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import type { DownloadableTemplate } from "@shared/types/workflow";
import { cn } from "@/lib/utils";

interface TemplateDownloadsProps {
  templates: DownloadableTemplate[];
  downloadedTemplates: string[];
  onDownload: (templateId: string) => void;
}

export function TemplateDownloads({
  templates,
  downloadedTemplates,
  onDownload,
}: TemplateDownloadsProps) {
  const handleDownload = (template: DownloadableTemplate) => {
    onDownload(template.id);
    const link = document.createElement("a");
    link.href = template.downloadUrl;
    link.download = `${template.name}.${template.format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">下载模板</h2>
        <p className="text-muted-foreground mt-1">
          专业设计模板，帮助你快速完成作业
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const isDownloaded = downloadedTemplates.includes(template.id);

          return (
            <Card
              key={template.id}
              className={cn(
                "transition-all hover:shadow-lg",
                isDownloaded && "ring-2 ring-primary/20"
              )}
            >
              <CardHeader className="p-0">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative group">
                  <img
                    src={template.thumbnailUrl}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {isDownloaded && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      onClick={() => handleDownload(template)}
                      size="sm"
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      下载
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-base line-clamp-1">
                      {template.name}
                    </CardTitle>
                    <Badge variant="secondary" className="shrink-0 ml-2">
                      {template.format}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {template.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {template.fileSize}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {template.downloadCount} 次下载
                  </span>
                </div>

                <Button
                  onClick={() => handleDownload(template)}
                  className="w-full gap-2"
                  variant={isDownloaded ? "outline" : "default"}
                  size="sm"
                >
                  {isDownloaded ? "重新下载" : "下载模板"}
                  <Download className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

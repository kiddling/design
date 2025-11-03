import * as React from "react";
import { cn } from "@/lib/utils";

interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function RichText({ className, children, ...props }: RichTextProps) {
  return (
    <div
      className={cn(
        "prose prose-slate dark:prose-invert max-w-none",
        "prose-headings:scroll-mt-20 prose-headings:font-bold",
        "prose-h1:text-3xl prose-h1:mb-4",
        "prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-8",
        "prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-6",
        "prose-p:leading-7 prose-p:mb-4",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-strong:font-semibold prose-strong:text-foreground",
        "prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6",
        "prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6",
        "prose-li:my-1",
        "prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:my-4",
        "prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono",
        "prose-pre:bg-muted prose-pre:border prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto",
        "prose-img:rounded-lg prose-img:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

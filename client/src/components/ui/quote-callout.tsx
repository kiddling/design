import * as React from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteCalloutProps extends React.HTMLAttributes<HTMLQuoteElement> {
  author?: string;
  source?: string;
}

export function QuoteCallout({
  children,
  author,
  source,
  className,
  ...props
}: QuoteCalloutProps) {
  return (
    <blockquote
      className={cn(
        "relative border-l-4 border-primary bg-muted/50 p-6 italic my-6",
        className
      )}
      {...props}
    >
      <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/20" />
      <div className="relative pl-8">
        <p className="text-lg mb-2">{children}</p>
        {(author || source) && (
          <footer className="text-sm text-muted-foreground not-italic mt-3">
            {author && <span className="font-medium">— {author}</span>}
            {source && <cite className="ml-2">《{source}》</cite>}
          </footer>
        )}
      </div>
    </blockquote>
  );
}

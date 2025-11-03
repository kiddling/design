import * as React from "react";
import { cn } from "@/lib/utils";

interface MediaFigureProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
}

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function MediaFigure({
  src,
  alt,
  caption,
  credit,
  aspectRatio,
  className,
  ...props
}: MediaFigureProps) {
  return (
    <figure className={cn("my-6", className)} {...props}>
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-muted",
          aspectRatio && aspectRatioClasses[aspectRatio]
        )}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          {caption && <div>{caption}</div>}
          {credit && <div className="text-xs mt-1">图片来源: {credit}</div>}
        </figcaption>
      )}
    </figure>
  );
}

import * as React from "react";
import { Info, AlertTriangle, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type BannerVariant = "info" | "warning" | "success" | "error" | "tip";

interface InfoBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BannerVariant;
  title?: string;
}

const variantConfig: Record<BannerVariant, { icon: typeof Info; className: string }> = {
  info: {
    icon: Info,
    className: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300",
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300",
  },
  success: {
    icon: CheckCircle,
    className: "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300",
  },
  error: {
    icon: XCircle,
    className: "bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
  },
  tip: {
    icon: Lightbulb,
    className: "bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300",
  },
};

export function InfoBanner({
  variant = "info",
  title,
  children,
  className,
  ...props
}: InfoBannerProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg border",
        config.className,
        className
      )}
      role="alert"
      {...props}
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}

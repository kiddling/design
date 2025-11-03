import * as React from "react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

export type Status = "active" | "completed" | "pending" | "locked";

interface StatusPillProps {
  status: Status;
  label?: string;
  className?: string;
}

const statusConfig = {
  active: {
    label: "进行中",
    dotColor: "text-green-500",
    className: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300",
  },
  completed: {
    label: "已完成",
    dotColor: "text-blue-500",
    className: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
  },
  pending: {
    label: "待开始",
    dotColor: "text-yellow-500",
    className: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
  },
  locked: {
    label: "已锁定",
    dotColor: "text-gray-500",
    className: "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300",
  },
};

export function StatusPill({ status, label, className }: StatusPillProps) {
  const config = statusConfig[status];
  
  return (
    <Badge
      variant="outline"
      className={cn("gap-1", config.className, className)}
    >
      <Circle className={cn("h-2 w-2 fill-current", config.dotColor)} />
      {label || config.label}
    </Badge>
  );
}

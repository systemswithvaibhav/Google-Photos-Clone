"use client";

import { Cloud } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type StorageWidgetProps = {
  usedBytes?: number;
  totalBytes?: number;
};

export function StorageWidget({
  usedBytes = 0,
  totalBytes = 15 * 1024 * 1024 * 1024, // 15 GB default
}: StorageWidgetProps) {
  const percentage = Math.min(100, Math.round((usedBytes / totalBytes) * 100));
  const usedGB = (usedBytes / (1024 * 1024 * 1024)).toFixed(1);
  const totalGB = (totalBytes / (1024 * 1024 * 1024)).toFixed(0);

  return (
    <div className="space-y-2 rounded-xl bg-sidebar-accent/30 p-3">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Cloud className="size-3.5" />
          <span>Storage</span>
        </div>
        <span className="font-medium text-sidebar-foreground">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-1.5" />
      <p className="text-[11px] text-muted-foreground">
        {usedGB} GB of {totalGB} GB used
      </p>
    </div>
  );
}
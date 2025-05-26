import { cn } from "@/lib/utils";
import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  variant?: "default" | "bordered";
}

export function StatsCard({
  title,
  value,
  icon,
  variant = "default",
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-3",
        variant === "default" && "bg-muted/50",
        variant === "bordered" && "border bg-card"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-primary/10 p-2 text-primary">{icon}</div>
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

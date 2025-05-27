import { cn } from "@/lib/utils";
import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  variant?: "default" | "bordered" | "fancy";
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
        "rounded-lg p-2.5 transition-all duration-300 group cursor-pointer",
        variant === "default" && "bg-muted/50",
        variant === "bordered" && "border bg-card",
        variant === "fancy" &&
          "w-full relative overflow-hidden bg-gradient-to-br from-black/20 via-primary/5 to-black/20 backdrop-blur-sm border border-white/10 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(var(--primary),0.15)] hover:bg-gradient-to-br hover:from-black/30 hover:via-primary/10 hover:to-black/30",
      )}
    >
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            "rounded-md bg-primary/10 p-1.5 text-primary transition-all duration-300",
            variant === "fancy" &&
              "bg-background/60 border border-primary/10 text-primary group-hover:bg-primary/20 group-hover:border-primary/20",
          )}
        >
          {icon}
        </div>
        <div>
          <p
            className={cn(
              "text-[10px] text-muted-foreground transition-colors duration-300",
              variant === "fancy" && "text-white/60 group-hover:text-white/80",
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              "text-sm font-medium transition-all duration-300",
              variant === "fancy" &&
                "text-base text-primary group-hover:text-primary/90",
            )}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

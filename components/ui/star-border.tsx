import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementType } from "react";

interface StarBorderProps<T extends ElementType> {
  as?: T;
  color?: string;
  speed?: string;
  className?: string;
  children: React.ReactNode;
  size?: "sm" | "default";
  variant?: "default" | "secondary";
}

export function StarBorder<T extends ElementType = "button">({
  as,
  className,
  color,
  speed = "6s",
  size = "default",
  variant = "default",
  children,
  ...props
}: StarBorderProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) {
  const Component = as || "button";
  const defaultColor = color || "hsl(var(--foreground))";

  return (
    <Component
      className={cn(
        "relative inline-block py-[1px] overflow-hidden rounded-[4px]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0",
          "opacity-20 dark:opacity-70"
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          "absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0",
          "opacity-20 dark:opacity-70"
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          "relative z-1 border text-foreground text-center rounded-[4px] font-[Audiowide]",
          // Default variant
          variant === "default" && [
            "bg-gradient-to-b from-background/90 to-muted/90 border-border/40",
            "dark:from-background dark:to-muted dark:border-border",
          ],
          // Secondary variant
          variant === "secondary" && [
            "bg-gradient-to-b from-secondary/90 to-secondary-foreground/90 border-secondary/40",
            "dark:from-secondary dark:to-secondary-foreground dark:border-secondary",
            "text-secondary-foreground dark:text-secondary",
          ],
          // Size variations
          size === "sm" ? "text-xxs py-2 px-3" : "text-base py-4 px-6"
        )}
      >
        {children}
      </div>
    </Component>
  );
}

interface BadgeProps {
  label: string;
  className?: string;
}

export function BadgeFe({ label, className }: BadgeProps) {
  return (
    <div className="inline-flex items-center justify-center">
      <span
        className={`inline-flex tracking-wide items-center rounded-sm px-3 py-1 text-[9px] font-medium ring-1 ring-inset text-foreground/80 ring-border/40 ${className}`}
      >
        {label}
      </span>
    </div>
  );
}

import { cn } from "@/lib/utils";
import * as React from "react";

const FileInput = React.forwardRef<
  HTMLInputElement,
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange"
  > & {
    onChange?: (file: File | null) => void;
  }
>(({ className, onChange, ...props }, ref) => {
  return (
    <input
      type="file"
      onChange={(e) => {
        const file = e.target.files?.[0] || null;
        if (onChange) {
          onChange(file);
        }
      }}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
FileInput.displayName = "FileInput";

export { FileInput };

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors duration-150 select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-app)]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]",
          // Variants
          variant === "primary" &&
            "bg-[var(--color-accent)] text-[var(--color-accent-fg)] hover:bg-[var(--color-accent-hover)] rounded-md shadow-xs",
          variant === "secondary" &&
            "bg-[var(--color-bg-surface)] text-[var(--color-ink-primary)] border border-[var(--color-border-hairline)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-hover)] rounded-md shadow-xs",
          variant === "ghost" &&
            "text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] hover:bg-[var(--color-bg-hover)] rounded-md",
          variant === "destructive" &&
            "bg-[var(--color-signal-down)] text-white hover:opacity-90 rounded-md shadow-xs",
          // Sizes (4px grid aligned)
          size === "sm" && "h-8 px-3 py-1 text-xs gap-1.5",
          size === "md" && "h-9 px-4 py-2 text-sm gap-2",
          size === "lg" && "h-11 px-6 py-2.5 text-sm gap-2.5",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

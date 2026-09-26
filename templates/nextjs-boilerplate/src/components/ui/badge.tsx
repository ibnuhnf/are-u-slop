import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "success" | "warning" | "danger" | "accent";
}

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded border select-none",
        variant === "neutral" &&
          "bg-[var(--color-bg-subtle)] text-[var(--color-ink-secondary)] border-[var(--color-border-hairline)]",
        variant === "success" &&
          "bg-[oklch(0.65_0.19_145/0.12)] text-[var(--color-signal-up)] border-[oklch(0.65_0.19_145/0.3)]",
        variant === "warning" &&
          "bg-[oklch(0.75_0.16_75/0.12)] text-[var(--color-signal-warn)] border-[oklch(0.75_0.16_75/0.3)]",
        variant === "danger" &&
          "bg-[oklch(0.60_0.22_25/0.12)] text-[var(--color-signal-down)] border-[oklch(0.60_0.22_25/0.3)]",
        variant === "accent" &&
          "bg-[oklch(0.65_0.22_255/0.12)] text-[var(--color-accent)] border-[oklch(0.65_0.22_255/0.3)]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

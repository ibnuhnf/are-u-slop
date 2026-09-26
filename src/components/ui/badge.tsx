import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "neutral" | "success" | "warning" | "danger";
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  const variantStyles = {
    neutral: "bg-surface-border/50 text-ink border-surface-border",
    success: "bg-success-bg text-success border-success/20",
    warning: "bg-warning-bg text-warning border-warning/20",
    danger: "bg-danger-bg text-danger border-danger/20",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        "select-none transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

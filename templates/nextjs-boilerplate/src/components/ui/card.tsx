import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "inset";
}

export function Card({ className, variant = "default", children, ...props }: CardProps) {
  const variantStyles = {
    default: "bg-surface border-surface-border shadow-xs",
    subtle: "bg-surface-hover border-surface-border-subtle",
    inset: "bg-background border-surface-border",
  };

  return (
    <div
      className={cn(
        "rounded-lg border transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

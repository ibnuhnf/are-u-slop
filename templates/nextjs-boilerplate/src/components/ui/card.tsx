import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "inset";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border transition-colors",
        variant === "default" &&
          "bg-[var(--color-bg-surface)] border-[var(--color-border-hairline)] shadow-xs",
        variant === "subtle" &&
          "bg-[var(--color-bg-subtle)] border-[var(--color-border-hairline)]",
        variant === "inset" &&
          "bg-[var(--color-bg-app)] border-[var(--color-border-hairline)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

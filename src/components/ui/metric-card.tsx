import * as React from "react";
import { cn } from "@/lib/utils";

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  delta?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
}

export function MetricCard({ label, value, delta, className, ...props }: MetricCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between max-h-[96px] h-full p-4",
        "bg-surface border border-surface-border rounded-lg shadow-xs",
        "select-none",
        className
      )}
      {...props}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
        {label}
      </span>

      <div className="flex items-baseline justify-between mt-1">
        <span className="text-2xl font-semibold tracking-tight text-ink font-mono tabular-nums">
          {value}
        </span>

        {delta && (
          <span
            className={cn(
              "text-xs font-medium tabular-nums font-mono",
              delta.trend === "up" && "text-success",
              delta.trend === "down" && "text-danger",
              delta.trend === "neutral" && "text-ink-muted"
            )}
          >
            {delta.trend === "up" && "+"}
            {delta.value}
          </span>
        )}
      </div>
    </div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  unit?: string;
  delta?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  /** Bar sparkline opsional. Dirender sebagai baris tipis di dasar card. */
  sparkline?: number[];
}

/* Batas keras 96px: metric card bukan hero section.
   Anggaran: p-3 (24) + label 11 + value 20 + gap 12 + sparkline 25 = 92px. */
export function MetricCard({
  label,
  value,
  unit,
  delta,
  sparkline,
  className,
  ...props
}: MetricCardProps) {
  const max = sparkline ? Math.max(...sparkline) : 0;
  const min = sparkline ? Math.min(...sparkline) : 0;

  return (
    <div
      className={cn(
        "group flex max-h-[96px] flex-col p-3",
        "rounded-lg border border-surface-border bg-surface shadow-xs select-none",
        "interactive-subtle hover:bg-surface-hover hover:border-surface-border-hover hover:shadow-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-mono text-[11px] font-medium uppercase leading-none tracking-wider text-ink-muted">
          {label}
        </span>
        {delta && (
          <span
            className={cn(
              "shrink-0 font-mono text-[11px] font-medium leading-none tabular-nums",
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

      <div className="mt-1 flex items-baseline gap-1 leading-none">
        <span className="font-mono text-xl font-semibold tabular-nums tracking-tight text-ink">
          {value}
        </span>
        {unit && <span className="font-mono text-[11px] text-ink-muted">{unit}</span>}
      </div>

      {sparkline && sparkline.length > 0 && (
        <div className="mt-2 flex h-3 items-end gap-0.5 border-t border-surface-border-subtle pt-1">
          {sparkline.map((val, i) => (
            <span
              key={i}
              style={{
                height: `${max === min ? 50 : ((val - min) / (max - min)) * 80 + 20}%`,
              }}
              className="flex-1 rounded-sm bg-primary/30 transition-colors group-hover:bg-primary/50"
            />
          ))}
        </div>
      )}
    </div>
  );
}

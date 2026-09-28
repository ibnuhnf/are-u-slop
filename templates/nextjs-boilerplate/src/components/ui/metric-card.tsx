import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sparkline } from "@/components/ui/sparkline";

export interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  delta?: number;
  trend?: "up" | "down" | "neutral";
  /** Apakah tren ini kabar baik. Menentukan warna, bukan arah panah. */
  positive?: boolean;
  caption?: string;
  sparkline?: number[];
  className?: string;
}

/**
 * Metric card dengan batas keras 96px.
 * Anggaran tinggi: p-3 (24) + label 11 + nilai 20 + gap 12 + sparkline 25 = 92px.
 */
export function MetricCard({
  label,
  value,
  unit,
  delta,
  trend = "neutral",
  positive,
  caption,
  sparkline,
  className,
}: MetricCardProps) {
  const TrendIcon =
    trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;

  const isGood = positive ?? trend === "up";
  const showTone = trend !== "neutral" && typeof delta === "number";

  return (
    <div
      className={cn(
        "group flex max-h-[96px] flex-col rounded-lg border border-surface-border bg-surface p-3 shadow-xs select-none",
        "interactive-subtle hover:border-surface-border-hover hover:bg-surface-hover hover:shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-mono text-[11px] font-medium uppercase leading-none tracking-wider text-ink-muted">
          {label}
        </span>

        {showTone && (
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-0.5 font-mono text-[11px] font-medium leading-none tabular-nums",
              isGood ? "text-success" : "text-danger"
            )}
          >
            <TrendIcon className="h-3 w-3" aria-hidden="true" />
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
      </div>

      <div className="mt-1 flex items-baseline gap-1 leading-none">
        <span className="font-mono text-xl font-semibold tabular-nums tracking-tight text-ink">
          {value}
        </span>
        {unit && (
          <span className="font-mono text-[11px] text-ink-muted">{unit}</span>
        )}
      </div>

      {sparkline && sparkline.length > 1 ? (
        <div className="mt-2 border-t border-surface-border-subtle pt-1">
          <Sparkline data={sparkline} height={12} />
        </div>
      ) : (
        caption && (
          <p className="mt-2 truncate border-t border-surface-border-subtle pt-1 text-[11px] leading-tight text-ink-muted">
            {caption}
          </p>
        )
      )}
    </div>
  );
}

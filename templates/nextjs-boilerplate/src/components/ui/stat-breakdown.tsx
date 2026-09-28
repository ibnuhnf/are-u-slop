import { cn } from "@/lib/utils";

export interface BreakdownRow {
  label: string;
  value: string;
  /** 0-100. Dipakai untuk lebar bar proporsional. */
  share: number;
  hint?: string;
}

export interface StatBreakdownProps {
  title: string;
  rows: BreakdownRow[];
  className?: string;
}

/**
 * Daftar breakdown dengan bar proporsional. Satu hue saja (primary),
 * tanpa warna berbeda per baris supaya tidak jadi pelangi dekoratif.
 */
export function StatBreakdown({ title, rows, className }: StatBreakdownProps) {
  const max = Math.max(...rows.map((r) => r.share), 1);

  return (
    <section className={cn("flex flex-col", className)} aria-label={title}>
      <h2 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
        {title}
      </h2>

      <ul className="mt-3 space-y-2.5">
        {rows.map((row) => (
          <li key={row.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate text-xs text-ink-secondary">
                {row.label}
              </span>
              <span className="shrink-0 font-mono text-xs tabular-nums text-ink">
                {row.value}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-2">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-active">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(row.share / max) * 100}%` }}
                />
              </div>
              <span className="w-10 shrink-0 text-right font-mono text-[11px] tabular-nums text-ink-muted">
                {row.share.toFixed(0)}%
              </span>
            </div>

            {row.hint && (
              <p className="mt-0.5 text-[11px] text-ink-muted">{row.hint}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

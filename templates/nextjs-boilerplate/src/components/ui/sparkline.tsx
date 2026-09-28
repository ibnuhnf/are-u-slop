import { cn } from "@/lib/utils";

export interface SparklineProps {
  data: number[];
  className?: string;
  /** Tinggi bar dalam pixel. Default 12 (h-3). */
  height?: number;
}

/**
 * Sparkline bar minimal. Nilai dinormalisasi ke rentang 20-100% supaya
 * bar terendah tetap terlihat. Warna memakai token, bukan hex.
 */
export function Sparkline({ data, className, height = 12 }: SparklineProps) {
  if (data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min;

  return (
    <div
      aria-hidden="true"
      className={cn("flex items-end gap-px", className)}
      style={{ height }}
    >
      {data.map((value, index) => {
        const ratio = span === 0 ? 0.5 : (value - min) / span;
        return (
          <span
            key={index}
            style={{ height: `${ratio * 80 + 20}%` }}
            className="flex-1 rounded-sm bg-primary/35 transition-colors duration-150 group-hover:bg-primary/60"
          />
        );
      })}
    </div>
  );
}

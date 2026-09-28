import { cn } from "@/lib/utils";

export interface AreaChartProps {
  data: number[];
  height?: number;
  className?: string;
  label?: string;
}

/**
 * Area chart SVG tanpa dependency. Gridline horizontal 1px hairline,
 * area memakai token primary dengan opasitas rendah, tanpa glow.
 */
export function AreaChart({ data, height = 160, className, label }: AreaChartProps) {
  if (data.length < 2) return null;

  const width = 720;
  const padTop = 12;
  const padBottom = 20;
  const plotHeight = height - padTop - padBottom;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = padTop + plotHeight - ((value - min) / span) * plotHeight;
    return [x, y] as const;
  });

  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width} ${padTop + plotHeight} L0 ${padTop + plotHeight} Z`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={label ?? "Grafik volume per jam"}
        className="h-40 w-full"
      >
        {gridLines.map((ratio) => {
          const y = padTop + plotHeight * ratio;
          return (
            <line
              key={ratio}
              x1={0}
              x2={width}
              y1={y}
              y2={y}
              className="stroke-surface-border-subtle"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        <path d={area} className="fill-primary/12" />
        <path
          d={line}
          className="stroke-primary"
          strokeWidth={1.5}
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {points.map(([x, y], index) =>
          index === points.length - 1 ? (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={3}
              className="fill-primary"
              vectorEffect="non-scaling-stroke"
            />
          ) : null
        )}
      </svg>

      <figcaption className="mt-2 flex justify-between font-mono text-[11px] tabular-nums text-ink-muted">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:00</span>
      </figcaption>
    </figure>
  );
}

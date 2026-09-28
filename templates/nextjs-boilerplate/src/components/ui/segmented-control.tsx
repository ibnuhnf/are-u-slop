"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  count?: number;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
}

/**
 * Segmented control: satu baris, hairline border, indikator aktif
 * memakai surface shift (bukan gradient, bukan glow).
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  ariaLabel,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-px rounded-md border border-surface-border bg-surface p-0.5",
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onValueChange(option.value)}
            className={cn(
              "inline-flex h-6 items-center gap-1.5 rounded-sm px-2.5 text-xs font-medium",
              "interactive-subtle",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isActive
                ? "bg-surface-active text-ink"
                : "text-ink-secondary hover:bg-surface-hover hover:text-ink"
            )}
          >
            {option.label}
            {typeof option.count === "number" && (
              <span
                className={cn(
                  "font-mono text-[10px] tabular-nums",
                  isActive ? "text-ink-secondary" : "text-ink-muted"
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

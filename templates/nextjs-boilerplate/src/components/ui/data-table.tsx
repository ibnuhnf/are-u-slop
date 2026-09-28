"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortDirection = "asc" | "desc";

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  align?: "left" | "right" | "center";
  /** Aktifkan pengurutan. Membutuhkan accessorKey bertipe string/number. */
  sortable?: boolean;
  /** Lebar kolom opsional, mis. "120px". */
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
  sort?: SortState | null;
  onSortChange?: (next: SortState | null) => void;
  onRowClick?: (item: T) => void;
  /** Row yang sedang terpilih, dibandingkan via referensi objek. */
  selectedRow?: T | null;
}

/**
 * Tabel data high-density.
 * Row height 36-40px (h-9 / h-10), cell padding horizontal 12px (px-3),
 * angka rata kanan dengan tabular-nums, hairline 1px, tanpa zebra-stripe.
 */
export function DataTable<T>({
  columns,
  data,
  emptyMessage = "Tidak ada data yang cocok.",
  className,
  sort = null,
  onSortChange,
  onRowClick,
  selectedRow = null,
}: DataTableProps<T>) {
  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !column.accessorKey || !onSortChange) return;
    const key = String(column.accessorKey);

    if (sort?.key !== key) {
      onSortChange({ key, direction: "desc" });
      return;
    }
    if (sort.direction === "desc") {
      onSortChange({ key, direction: "asc" });
      return;
    }
    onSortChange(null);
  };

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="h-9 border-b border-surface-border bg-surface-hover">
            {columns.map((column) => {
              const key = column.accessorKey ? String(column.accessorKey) : null;
              const isSorted = key !== null && sort?.key === key;
              const SortIcon = !isSorted
                ? ChevronsUpDown
                : sort?.direction === "asc"
                  ? ArrowUp
                  : ArrowDown;

              return (
                <th
                  key={column.header}
                  scope="col"
                  style={column.width ? { width: column.width } : undefined}
                  aria-sort={
                    isSorted
                      ? sort?.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                  className={cn(
                    "px-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted",
                    column.align === "right" && "text-right",
                    column.align === "center" && "text-center"
                  )}
                >
                  {column.sortable && key ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column)}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-sm interactive-subtle",
                        "hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        column.align === "right" && "flex-row-reverse",
                        isSorted && "text-ink"
                      )}
                    >
                      {column.header}
                      <SortIcon className="h-3 w-3" aria-hidden="true" />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="divide-y divide-surface-border-subtle">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="h-28 text-center text-sm text-ink-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const isSelected = selectedRow === row;
              return (
                <tr
                  key={rowIndex}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(
                    "h-10 transition-colors duration-150",
                    onRowClick && "cursor-pointer",
                    isSelected ? "bg-surface-active" : "hover:bg-surface-hover"
                  )}
                >
                  {columns.map((column) => {
                    const content = column.cell
                      ? column.cell(row)
                      : column.accessorKey
                        ? String(row[column.accessorKey] ?? "")
                        : null;

                    return (
                      <td
                        key={column.header}
                        className={cn(
                          "px-3 text-sm text-ink",
                          column.align === "right" &&
                            "text-right font-mono tabular-nums",
                          column.align === "center" && "text-center"
                        )}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

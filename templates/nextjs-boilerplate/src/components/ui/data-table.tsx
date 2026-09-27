import * as React from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  align?: "left" | "right" | "center";
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
}

/* Row height 36-40px (h-9 / h-10), cell padding horizontal 12px (px-3). */
export function DataTable<T>({
  columns,
  data,
  emptyMessage = "No records found.",
  className,
}: DataTableProps<T>) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-lg border border-surface-border bg-surface",
        className
      )}
    >
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="h-9 border-b border-surface-border bg-surface-hover">
            {columns.map((col, index) => (
              <th
                key={index}
                className={cn(
                  "px-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center"
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border-subtle">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="h-24 text-center text-sm text-ink-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="h-10 transition-colors duration-150 hover:bg-surface-hover"
              >
                {columns.map((col, colIndex) => {
                  const content = col.cell
                    ? col.cell(row)
                    : col.accessorKey
                      ? String(row[col.accessorKey])
                      : null;

                  return (
                    <td
                      key={colIndex}
                      className={cn(
                        "px-3 text-sm text-ink",
                        col.align === "right" && "text-right font-mono tabular-nums",
                        col.align === "center" && "text-center"
                      )}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

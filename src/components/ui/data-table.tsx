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
  className?: string;
}

export function DataTable<T>({ columns, data, className }: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto border border-surface-border rounded-lg bg-surface", className)}>
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="border-b border-surface-border bg-background/50 h-9">
            {columns.map((col, index) => (
              <th
                key={index}
                className={cn(
                  "px-3 text-[11px] font-semibold text-ink-muted uppercase tracking-wider",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center"
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border/60">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center text-sm text-ink-muted">
                No records found.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="h-10 hover:bg-surface-hover/50 transition-colors"
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

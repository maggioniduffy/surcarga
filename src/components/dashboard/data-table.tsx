import { cn } from "@/lib/utils";

export type StatusTone = "brand" | "published" | "muted";

const statusToneClasses: Record<StatusTone, string> = {
  brand: "text-brand",
  published: "text-status-published-text",
  muted: "text-ink-subtle",
};

export interface TableRow {
  id: string;
  cells: readonly string[];
  statusTone: StatusTone;
}

interface DataTableProps {
  caption: string;
  columns: readonly string[];
  rows: readonly TableRow[];
  /** Column widths applied from `md` up; below that rows stack. */
  widths: readonly string[];
}

/**
 * The dashboard's listing table. From `md` up it is a real table; below that
 * each row collapses into a labelled stack so nothing scrolls sideways.
 */
export function DataTable({ caption, columns, rows, widths }: DataTableProps) {
  const lastIndex = columns.length - 1;

  return (
    <table className="mt-5 w-full border-collapse text-sm">
      <caption className="sr-only">{caption}</caption>

      <colgroup>
        {widths.map((width, index) => (
          <col key={columns[index]} style={{ width }} />
        ))}
      </colgroup>

      <thead className="hidden md:table-header-group">
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              scope="col"
              className="border-b border-line-subtle pb-3 text-left text-[11.5px] font-normal tracking-[0.1em] text-ink-ghost uppercase"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={row.id}
            className={cn(
              "block border-b border-line-subtle py-3 md:table-row md:py-0",
              rowIndex === rows.length - 1 && "border-b-0"
            )}
          >
            {row.cells.map((cell, index) => (
              <td
                key={columns[index]}
                className={cn(
                  "flex items-baseline justify-between gap-4 py-1 md:table-cell md:border-b md:border-surface-control md:py-4",
                  rowIndex === rows.length - 1 && "md:border-b-0",
                  index === 0 && "font-semibold",
                  index !== 0 && index !== lastIndex && "text-ink-subtle",
                  index === lastIndex && cn("font-semibold", statusToneClasses[row.statusTone])
                )}
              >
                <span className="shrink-0 text-[11px] font-normal tracking-[0.08em] whitespace-nowrap text-ink-ghost uppercase md:hidden">
                  {columns[index]}
                </span>
                <span className="text-right md:text-left">{cell}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

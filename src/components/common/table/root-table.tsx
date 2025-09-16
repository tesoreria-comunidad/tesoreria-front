import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowData,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  TableColumnFilterType,
  TableType,
} from "@/interface/root-table.interface";
import { Fragment, useMemo, useState, type ReactNode } from "react";
import "./table.css";
import { ColumnVisibility } from "./header/ColumnVisibility";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
    filterType?: TableColumnFilterType;
    filterPositon?: "inline" | "bottom";
  }
}

export type TColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  hidden?: boolean;
};

interface DataTableProps<TData, TValue> {
  columns: (ColumnDef<TData, TValue> & { hidden?: boolean })[];
  data: TData[];
  tableType?: TableType;
  getRowCanExpand?: () => boolean;
  renderSubComponent?: (row: TData) => ReactNode;
  pageSize?: number;
  tableNameRef?: string;
  tableHeader?: boolean;
}

export function RootTable<TData, TValue>({
  columns,
  data,
  pageSize = 20,
  tableHeader = false,
}: DataTableProps<TData, TValue>) {
  // columnas inicialmente ocultas segun prop `hidden`
  const initialVisibility = useMemo(() => {
    const visibility: Record<string, boolean> = {};
    columns.forEach((col) => {
      // @ts-ignore
      if (col.accessorKey && col.hidden) {
        // @ts-ignore
        visibility[col.accessorKey as string] = false;
      }
    });
    return visibility;
  }, [columns]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [columnVisibility, setColumnVisibility] = useState(initialVisibility);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    defaultColumn: {
      size: 200,
      minSize: 10,
      maxSize: 500,
    },
    autoResetPageIndex: true,
    debugTable: false,
    onPaginationChange: setPagination,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full flex flex-col gap-2">
      {tableHeader ? (
        <section className="flex items-center justify-end">
          <ColumnVisibility table={table} />
        </section>
      ) : null}

      <div
        className="
          w-full max-w-full overflow-x-auto overflow-y-hidden
          rounded-xl border bg-card shadow-sm
          scrollbar-modern
        "
      >
        <Table className="table-fixed">
          {/* HEADER */}
          <TableHeader
            className="
              sticky top-0 z-10
             
            "
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className={[
                      // separadores sutiles entre columnas
                      index > 0 && index < headerGroup.headers.length - 1
                        ? "border-x"
                        : "",

                      "border-border text-center font-semibold  bg-muted ",
                      "px-3 py-2 text-xs uppercase tracking-wide",
                      "text-muted-foreground",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "flex w-full items-center",
                        !header.column.getCanFilter()
                          ? "justify-between"
                          : "justify-center",
                      ].join(" ")}
                    >
                      <div className="truncate">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-28 text-center text-sm text-muted-foreground"
                >
                  No hay datos para mostrar
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    className="
                      text-left text-sm
                      even:bg-muted/30
                      hover:bg-muted/40
                      transition-colors
                    "
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="
                          px-3 py-2 align-middle
                          whitespace-nowrap
                        "
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </Fragment>
              ))
            )}
          </TableBody>
        </Table>

        {/* PAGINACIÓN */}
        {data.length > 10 && (
          <div
            className="
              flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between
              border-t border-border p-3
              bg-background/60
            "
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                aria-label="Primera página"
                className="
                  pagination-btn
                "
              >
                {"<<"}
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Página anterior"
                className="pagination-btn"
              >
                {"<"}
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Página siguiente"
                className="pagination-btn"
              >
                {">"}
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                aria-label="Última página"
                className="pagination-btn"
              >
                {">>"}
              </button>
            </div>

            <span className="text-xs sm:text-sm text-muted-foreground">
              Página{" "}
              <strong className="text-foreground">
                {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </strong>
            </span>

            <label className="inline-flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-muted-foreground">Filas:</span>
              <select
                className="
                  rounded-md border bg-background px-2 py-1
                  hover:bg-accent hover:text-accent-foreground
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  transition-colors
                "
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

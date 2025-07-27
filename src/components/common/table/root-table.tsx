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
import { Fragment, useState, type ReactNode } from "react";
import "./table.css";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
    filterType?: TableColumnFilterType;
    filterPositon?: "inline" | "bottom";
  }
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableType?: TableType;
  getRowCanExpand?: () => boolean;
  renderSubComponent?: (row: TData) => ReactNode;
  pageSize?: number;
  tableNameRef?: string;
}

export function RootTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination,
    },
    defaultColumn: {
      size: 200,
      minSize: 10,
      maxSize: 500,
    },
    autoResetPageIndex: true,
    debugTable: true,
    onPaginationChange: setPagination,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={"  flex flex-col  gap-1  "}>
      <div
        className={`  border   border-border   w-full  max-h-[100%]      scrollbar-custom `}
      >
        <Table className="table ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="  bg-light-grey   rounded-md  "
              >
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className={` ${
                      index > 0 && index < headerGroup.headers.length - 1
                        ? "border-x"
                        : ""
                    }    border-border text-center     font-semibold   `}
                  >
                    <div
                      className={`flex w-full  ${
                        !header.column.getCanFilter()
                          ? "justify-between"
                          : "justify-center"
                      } items-center  text-center `}
                    >
                      <div>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>

                      {/* <div
                        className={`${
                          !header.column.getCanFilter() ? "" : "hidden"
                        }`}
                      >
                        {!header.column.getCanFilter() ? (
                          <TableFilter
                            column={header.column}
                            table={table}
                            tableType={tableType}
                          />
                        ) : null}
                      </div> */}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow key={row.id} className={`  text-md    text-left  `}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-sm  ">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
        {data.length > 10 && (
          <div className="flex items-center justify-between p-2 border-t border-border">
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                {"<<"}
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                {"<"}
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                {">"}
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="px-2 py-1 border rounded disabled:opacity-50"
              >
                {">>"}
              </button>
            </div>

            <span className="text-sm">
              Página{" "}
              <strong>
                {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </strong>
            </span>

            <select
              className="text-sm border rounded px-2 py-1"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 50, 100].map((size) => (
                <option key={size} value={size}>
                  Mostrar {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

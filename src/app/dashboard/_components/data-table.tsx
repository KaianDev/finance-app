/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useActivityContext } from "@/context/activity.context";
import { useActivity } from "@/lib/query";

interface ActivityTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data
}: ActivityTableProps<TData, TValue>) {
  const { data: activities } = useActivity();
  const { enabled, pagination, setPagination } = useActivityContext();

  const getCount = () => {
    if (activities) {
      return Math.ceil(activities.length / pagination.pageSize);
    }
    return -1;
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: getCount(),
    onPaginationChange: setPagination,
    state: { pagination }
  });

  useEffect(() => {
    if (pagination.pageIndex > table.getPageCount() - 1) {
      table.setPageIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
  }, [activities]);

  return (
    <div className="py-5">
      <Table className="overflow-hidden rounded-md">
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow
              key={headerGroup.id}
              className="bg-zinc-800 hover:bg-zinc-800 dark:bg-background dark:hover:bg-background"
            >
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="font-bold text-zinc-200">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-b border-zinc-800/50 dark:border-zinc-200/50"
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!enabled && (
        <div className="mt-4 flex items-center justify-center gap-1">
          <Button
            variant="outline"
            disabled={!table.getCanPreviousPage()}
            onClick={table.previousPage}
          >
            <ChevronsLeft size={18} />
            <div className="hidden sm:block">Anterior</div>
          </Button>
          <div className="flex h-9 items-center justify-center rounded-md bg-white px-2 tracking-widest dark:bg-black">
            {pagination.pageIndex + 1} de{" "}
            {table.getPageCount() === 0 ? 1 : table.getPageCount()}
          </div>
          <Button
            variant="outline"
            onClick={table.nextPage}
            disabled={!table.getCanNextPage()}
          >
            <div className="hidden sm:block">Próximo</div>
            <ChevronsRight size={18} />
          </Button>
        </div>
      )}
    </div>
  );
}

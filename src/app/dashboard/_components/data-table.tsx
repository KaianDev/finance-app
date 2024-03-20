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
import { formatDecimal } from "@/helpers/formatDecimal";
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
    onPaginationChange: setPagination,
    pageCount: getCount(),
    state: { pagination }
  });

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
          <div className="flex size-9 items-center justify-center rounded-md bg-white tracking-widest dark:bg-black">
            {formatDecimal(pagination.pageIndex + 1)}
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

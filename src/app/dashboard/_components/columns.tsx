"use client";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Activity } from "@/types/activity";

import { DeleteActivityButton } from "./delete-activity-button";

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className={cn(column.id === "date" && "hidden sm:table-cell")}>
          Data
        </div>
      );
    },
    cell: ({ row, column }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString();

      return (
        <div className={cn(column.id === "date" && "hidden sm:table-cell")}>
          {formattedDate}
        </div>
      );
    }
  },
  {
    accessorKey: "description",
    header: () => {
      const title = "Descrição";
      return <div className="-ml-4 sm:ml-0">{title}</div>;
    },

    cell: ({ row }) => {
      const date = new Date(row.getValue("date") as string);
      const formattedDate = date.toLocaleDateString();
      const description = row.getValue("description") as string;
      return (
        <div className="-ml-4 sm:ml-0">
          <p className="truncate font-semibold sm:font-normal">{description}</p>
          <p className="text-xs sm:hidden">{formattedDate}</p>
        </div>
      );
    }
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => {
      const value = row.getValue("value") as number;
      const type = row.getValue("type") as string;

      const formattedValue = value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
      });

      return (
        <div
          className={
            type === "REVENUE"
              ? "font-semibold text-green-500 dark:text-emerald-500"
              : "font-semibold text-red-500"
          }
        >
          {formattedValue}
        </div>
      );
    }
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <div className={cn(column.id === "type" && "hidden sm:table-cell")}>
          Tipo
        </div>
      );
    },
    cell: ({ row, column }) => {
      const type = row.getValue("type") as string;
      const formattedType = type === "EXPENSE" ? "Despesa" : "Receita";

      return (
        <p className={cn(column.id === "type" && "hidden sm:table-cell")}>
          {formattedType}
        </p>
      );
    }
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const activity = row.original;
      return (
        <div className="-ml-5 sm:ml-0">
          <DeleteActivityButton activity={activity} key={activity.id} />
        </div>
      );
    }
  }
];

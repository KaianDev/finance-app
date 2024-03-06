"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Activity } from "@/types/activity";

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString();

      return <>{formattedDate}</>;
    }
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <p className="truncate">{description}</p>;
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
        <p
          className={
            type === "REVENUE"
              ? "text-green-500 dark:text-emerald-500"
              : "text-red-500"
          }
        >
          {formattedValue}
        </p>
      );
    }
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const formattedType = type === "EXPENSE" ? "Despesa" : "Receita";

      return <p>{formattedType}</p>;
    }
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      return <p>{id}</p>;
    }
  }
];

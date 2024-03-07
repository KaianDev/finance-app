"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Activity } from "@/types/activity";

import { DeleteActivityButton } from "./delete-activity-button";

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
              ? "font-semibold text-green-500 dark:text-emerald-500"
              : "font-semibold text-red-500"
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
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const activity = row.original;
      return <DeleteActivityButton activity={activity} key={activity.id} />;
    }
  }
];

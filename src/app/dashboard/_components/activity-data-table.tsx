"use client";

import { useActivity } from "@/lib/query";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export const ActivityDataTable = () => {
  const { data } = useActivity();

  return <DataTable columns={columns} data={data ? data : []} />;
};

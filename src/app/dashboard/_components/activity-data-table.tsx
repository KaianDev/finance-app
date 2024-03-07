"use client";

import { useActivity } from "@/lib/query";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { SkeletonTable } from "./skeleton-table";

export const ActivityDataTable = () => {
  const { data } = useActivity();

  if (data) {
    return <DataTable columns={columns} data={data} />;
  }

  return <SkeletonTable />;
};

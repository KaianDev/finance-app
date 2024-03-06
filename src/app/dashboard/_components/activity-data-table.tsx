"use client";
import { useActivity } from "@/context/activity.context";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export const ActivityDataTable = () => {
  const { activities } = useActivity();

  return <DataTable columns={columns} data={activities} />;
};

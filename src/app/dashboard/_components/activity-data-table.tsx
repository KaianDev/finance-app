"use client";

import { useActivityContext } from "@/context/activity.context";
import { useActivity, useFilteredActivity } from "@/lib/query";

import { ActivityFilter } from "./activity-filter";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { SkeletonTable } from "./skeleton-table";

export const ActivityDataTable = () => {
  const { filter, enabled, pagination } = useActivityContext();

  const { data } = useActivity(pagination);
  const { data: filtered } = useFilteredActivity(filter, enabled);

  if (enabled && filtered) {
    return (
      <>
        <ActivityFilter />
        <DataTable columns={columns} data={filtered} />
      </>
    );
  }

  if (!enabled && data) {
    return (
      <>
        <ActivityFilter />
        <DataTable columns={columns} data={data} />
      </>
    );
  }

  return <SkeletonTable />;
};

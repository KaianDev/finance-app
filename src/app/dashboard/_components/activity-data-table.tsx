"use client";

import { useActivitiesFiltered } from "@/context/activities-filtered.context";
import { useActivity } from "@/lib/query";

import { ActivityFilter } from "./activity-filter";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { SkeletonTable } from "./skeleton-table";

export const ActivityDataTable = () => {
  const { data } = useActivity();
  const { enabled, filteredActivities } = useActivitiesFiltered();

  if (data) {
    return (
      <>
        <ActivityFilter />
        <DataTable
          columns={columns}
          data={enabled ? filteredActivities : data}
        />
      </>
    );
  }

  return <SkeletonTable />;
};

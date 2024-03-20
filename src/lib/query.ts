import { useQuery } from "@tanstack/react-query";

import {
  getActivities,
  getActivitiesFiltered,
  getActivityBalance
} from "@/data/activities";
import type { ActivityFilter } from "@/types/activity-filter";
import type { Pagination } from "@/types/pagination";

export const useActivity = (params?: Pagination) =>
  useQuery({
    queryKey: ["activities", params],
    queryFn: () => getActivities(params)
  });

export const useActivityBalance = () =>
  useQuery({
    queryKey: ["activities", "balance"],
    queryFn: getActivityBalance
  });

export const useFilteredActivity = (filter: ActivityFilter, enabled: boolean) =>
  useQuery({
    queryKey: ["activities", filter],
    queryFn: () => getActivitiesFiltered(filter),
    enabled
  });

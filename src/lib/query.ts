import { useQuery } from "@tanstack/react-query";

import {
  getActivities,
  getActivitiesFiltered,
  getActivityBalance
} from "@/data/activities";
import { ActivityFilter } from "@/types/activity-filter";

export const useActivity = () =>
  useQuery({
    queryKey: ["activities"],
    queryFn: getActivities
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

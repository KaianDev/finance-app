import { useQuery } from "@tanstack/react-query";

import { getActivities, getActivityBalance } from "@/data/activities";

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

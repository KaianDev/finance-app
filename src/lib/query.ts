import { useQuery } from "@tanstack/react-query";

import { getActivities } from "@/data/activities";

export const useActivity = () =>
  useQuery({
    queryKey: ["activities"],
    queryFn: getActivities
  });

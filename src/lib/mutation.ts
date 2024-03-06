import { useMutation } from "@tanstack/react-query";

import { deleteActivity } from "@/data/activities";

import { queryClient } from "./query-client";

export const useDeleteActivity = (id: number) =>
  useMutation({
    mutationFn: () => deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities"]
      });
    }
  });

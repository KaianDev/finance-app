import { useMutation } from "@tanstack/react-query";

import { addActivity, deleteActivity } from "@/data/activities";

import { queryClient } from "./query-client";

export const useDeleteActivity = () =>
  useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities"]
      });
    }
  });

export const useAddActivity = () =>
  useMutation({
    mutationFn: addActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities"]
      });
    }
  });

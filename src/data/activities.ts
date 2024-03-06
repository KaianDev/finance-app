import { frontendApi } from "@/lib/api";
import { Activity } from "@/types/activity";

export const getActivities = async (): Promise<Activity[]> => {
  try {
    const results = await frontendApi.get("/activities");
    const activities = results.data as Activity[];
    return activities;
  } catch (error) {
    return [];
  }
};

export const deleteActivity = async (id: number) => {
  try {
    await frontendApi.delete(`/activities/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};

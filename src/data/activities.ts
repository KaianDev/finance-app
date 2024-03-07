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

export interface DataAddTypeRequest {
  description: string;
  value: number;
  type: "EXPENSE" | "REVENUE";
  date: Date;
}

export const addActivity = async (data: DataAddTypeRequest) => {
  try {
    const results = await frontendApi.post("/activities", data);
    return results.data;
  } catch {
    return false;
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

export const getActivityBalance = async () => {
  try {
    const results = await frontendApi.get("/activities/balance");
    const balance = results.data.balance as number;
    return balance;
  } catch (error) {
    return false;
  }
};

export const getPDF = async () => {
  try {
    const results = await frontendApi.get("activities/pdf");
    const pdf = results.data as string;
    return pdf;
  } catch {
    return false;
  }
};

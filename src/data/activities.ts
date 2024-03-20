import { AxiosError } from "axios";

import { frontendApi } from "@/lib/api";
import type { Activity } from "@/types/activity";
import type { ActivityFilter } from "@/types/activity-filter";
import type { Pagination } from "@/types/pagination";

export const getActivities = async (
  params?: Pagination
): Promise<Activity[]> => {
  try {
    const results = await frontendApi.get("/activities", {
      params
    });
    const activities = results.data as Activity[];
    return activities;
  } catch (error) {
    return [];
  }
};

export const getActivitiesFiltered = async (filter: ActivityFilter) => {
  try {
    const results = await frontendApi.get("/activities/filter", {
      params: filter
    });
    return results.data as Activity[];
  } catch {
    return [];
  }
};

export interface DataAddTypeRequest {
  description: string;
  value: number;
  type: "EXPENSE" | "REVENUE";
  date: string;
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
  } catch (e) {
    const axiosError = e as AxiosError;
    const status = axiosError.response?.status;
    if (status === 500) {
      throw new AxiosError("Ocorreu um erro no servidor, tente mais tarde");
    }
    throw new AxiosError("Ocorreu um erro desconhecido.");
  }
};

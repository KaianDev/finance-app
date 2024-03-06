/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { frontendApi } from "@/lib/api";
import { Activity } from "@/types/activity";

interface IActivityContext {
  activities: Activity[];
  getActivities: () => Promise<Activity[]>;
  deleteActivity: (id: number) => Promise<boolean>;
  refreshActivities: () => Promise<void>;
}

const ActivityContext = createContext({} as IActivityContext);

interface ActivityContextProviderProps {
  children: React.ReactNode;
}
export const ActivityContextProvider = ({
  children
}: ActivityContextProviderProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const getActivities = async () => {
    try {
      const results = await frontendApi.get("/activities");
      const data = results.data as Activity[];
      return data;
    } catch (error) {
      return [];
    }
  };

  const deleteActivity = async (id: number) => {
    try {
      await frontendApi.delete(`/activities/${id}`, {});
      getActivities();
      return true;
    } catch (error) {
      return false;
    }
  };

  const refreshActivities = async () => {
    const activities = await getActivities();
    setActivities(activities);
  };

  useEffect(() => {
    refreshActivities();
  }, []);

  return (
    <ActivityContext.Provider
      value={{ activities, getActivities, deleteActivity, refreshActivities }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);

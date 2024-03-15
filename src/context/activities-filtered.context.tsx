/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useState } from "react";

import { Activity } from "@/types/activity";

interface IActivitiesFiltered {
  filteredActivities: Activity[];
  enabled: boolean;
  setFilteredActivities: (activities: Activity[]) => void;
  setEnabled: (v: boolean) => void;
}

const ActivitiesFiltered = createContext({} as IActivitiesFiltered);

interface ActivitiesFilteredProviderProps {
  children: React.ReactNode;
}
export const ActivitiesFilteredProvider = ({
  children
}: ActivitiesFilteredProviderProps) => {
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [enabled, setEnabled] = useState(false);

  return (
    <ActivitiesFiltered.Provider
      value={{ filteredActivities, setFilteredActivities, enabled, setEnabled }}
    >
      {children}
    </ActivitiesFiltered.Provider>
  );
};

export const useActivitiesFiltered = () => useContext(ActivitiesFiltered);

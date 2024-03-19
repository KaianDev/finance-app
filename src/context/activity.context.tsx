/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useState } from "react";

import { ActivityFilter } from "@/types/activity-filter";

interface IActivityContext {
  filter: ActivityFilter;
  enabled: boolean;
  pageSize: number;
  pageIndex: number;
  setFilter: (filter: ActivityFilter) => void;
  setEnabled: (v: boolean) => void;
  nextPage: () => void;
  previousPage: () => void;
}

const ActivityContext = createContext({} as IActivityContext);

interface ActivityContextProviderProps {
  children: React.ReactNode;
}
export const ActivityContextProvider = ({
  children
}: ActivityContextProviderProps) => {
  const [enabled, setEnabled] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [filter, setFilter] = useState<ActivityFilter>({});
  const pageSize = 5;

  const nextPage = () => {
    setPageIndex(prev => prev + 1);
  };

  const previousPage = () => {
    setPageIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <ActivityContext.Provider
      value={{
        filter,
        pageSize,
        pageIndex,
        enabled,
        setFilter,
        setEnabled,
        nextPage,
        previousPage
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => useContext(ActivityContext);

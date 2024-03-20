/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from "react";

import { ActivityFilter } from "@/types/activity-filter";
import { Pagination } from "@/types/pagination";

interface IActivityContext {
  filter: ActivityFilter;
  enabled: boolean;
  pagination: Pagination;
  setFilter: (filter: ActivityFilter) => void;
  setEnabled: (v: boolean) => void;
  setPagination: Dispatch<SetStateAction<Pagination>>;
}

const ActivityContext = createContext({} as IActivityContext);

interface ActivityContextProviderProps {
  children: React.ReactNode;
}
export const ActivityContextProvider = ({
  children
}: ActivityContextProviderProps) => {
  const [enabled, setEnabled] = useState(false);
  const [filter, setFilter] = useState<ActivityFilter>({});
  const [pagination, setPagination] = useState<Pagination>({
    pageSize: 5,
    pageIndex: 0
  });

  return (
    <ActivityContext.Provider
      value={{
        filter,
        enabled,
        pagination,
        setFilter,
        setEnabled,
        setPagination
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => useContext(ActivityContext);

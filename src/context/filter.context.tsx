/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useState } from "react";

import { ActivityFilter } from "@/types/activity-filter";

interface IFilterContext {
  filter: ActivityFilter;
  enabled: boolean;
  setFilter: (filter: ActivityFilter) => void;
  setEnabled: (v: boolean) => void;
}

const FilterContext = createContext({} as IFilterContext);

interface FilterContextProviderProps {
  children: React.ReactNode;
}
export const FilterContextProvider = ({
  children
}: FilterContextProviderProps) => {
  const [filter, setFilter] = useState<ActivityFilter>({});
  const [enabled, setEnabled] = useState(false);

  return (
    <FilterContext.Provider value={{ filter, setFilter, enabled, setEnabled }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);

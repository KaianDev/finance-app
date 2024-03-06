"use client";
import { useEffect, useState } from "react";

import { frontendApi } from "@/lib/api";
import { Activity } from "@/types/activity";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export const ActivityDataTable = () => {
  const [data, setData] = useState<Activity[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const results = await frontendApi.get("/activities");
        const data = results.data as Activity[];
        setData(data);
      } catch (error) {
        setData([]);
      }
    };
    getData();
  }, []);

  return <DataTable columns={columns} data={data} />;
};

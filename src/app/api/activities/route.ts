import { NextRequest, NextResponse } from "next/server";

import { getToken } from "@/helpers/getToken";
import { backendApi } from "@/lib/api";
import { Activity } from "@/types/activity";

interface IBackendResponseGET {
  activities: Activity[];
}

export const GET = async (request: NextRequest) => {
  const authToken = getToken(request);
  const url = request.nextUrl.searchParams;

  const paginationParams = {
    size: url.get("pageSize"),
    page: url.get("pageIndex")
  };

  try {
    const results = await backendApi.get("/activity/getAll", {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params: paginationParams
    });
    const activities = results.data as IBackendResponseGET;
    return new NextResponse(JSON.stringify(activities), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 500
    });
  }
};

export const POST = async (request: NextRequest) => {
  const authToken = getToken(request);

  try {
    if (authToken) {
      const data = await request.json();
      const results = await backendApi.post("activity/add", data, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const response = results.data;
      return new NextResponse(JSON.stringify(response), { status: 201 });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 500
    });
  }
};

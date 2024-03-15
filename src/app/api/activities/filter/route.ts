import { NextRequest, NextResponse } from "next/server";

import { getToken } from "@/helpers/getToken";
import { backendApi } from "@/lib/api";
import { Activity } from "@/types/activity";

export const GET = async (request: NextRequest) => {
  const authToken = getToken(request);
  try {
    const url = request.nextUrl.searchParams;
    const filterParams = {
      oneDate: url.get("oneDate"),
      secondDate: url.get("secondDate"),
      typeValue: url.get("typeValue")
    };
    const results = await backendApi.get("/activity/filter", {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params: filterParams
    });
    const activities = results.data as Activity[];
    return new NextResponse(JSON.stringify(activities), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 500
    });
  }
};

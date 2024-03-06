import { NextRequest, NextResponse } from "next/server";

import { getToken } from "@/helpers/getToken";
import { backendApi } from "@/lib/api";
import { Activity } from "@/types/activity";

interface IBackendResponseGET {
  activities: Activity[];
}

export const GET = async (request: NextRequest) => {
  const authToken = getToken(request);

  try {
    if (authToken) {
      const results = await backendApi.get("/activity/getAll", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const activities = results.data as IBackendResponseGET;
      return new NextResponse(JSON.stringify(activities), { status: 200 });
    }
  } catch (e) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 500
    });
  }
};

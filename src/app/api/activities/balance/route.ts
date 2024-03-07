import { NextRequest, NextResponse } from "next/server";

import { getToken } from "@/helpers/getToken";
import { backendApi } from "@/lib/api";

export const GET = async (request: NextRequest) => {
  const authToken = getToken(request);

  try {
    const results = await backendApi.get("/activity/balance", {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    const balance = results.data;
    return new NextResponse(JSON.stringify({ balance }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 500
    });
  }
};

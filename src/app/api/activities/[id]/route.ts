import { NextRequest, NextResponse } from "next/server";

import { getToken } from "@/helpers/getToken";
import { backendApi } from "@/lib/api";

interface Params {
  params: {
    id: string;
  };
}

export const DELETE = async (request: NextRequest, { params }: Params) => {
  const authToken = getToken(request);
  const id = params.id;
  try {
    await backendApi.delete("/activity/delete", {
      params: { id },
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return new NextResponse(JSON.stringify({ message: "" }));
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 500
    });
  }
};

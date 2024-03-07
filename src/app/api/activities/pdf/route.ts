import { NextRequest, NextResponse } from "next/server";

import { getToken } from "@/helpers/getToken";
import { backendApi } from "@/lib/api";

export const GET = async (request: NextRequest) => {
  const authToken = getToken(request);

  try {
    const results = await backendApi.get("/pdf/getPdf", {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/pdf",
        Accept: "application/pdf"
      },
      responseType: "blob"
    });

    const file = new Blob([results.data], {
      type: "application/pdf"
    });
    const fileURL = URL.createObjectURL(file);
    return new NextResponse(fileURL);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 500
    });
  }
};

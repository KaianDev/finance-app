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
      responseType: "arraybuffer"
    });

    const base64Url = btoa(
      String.fromCharCode(...new Uint8Array(results.data))
    );
    const pdfDataUrl = `data:application/pdf;headers=filename%3D;base64,${base64Url}`;
    return new NextResponse(pdfDataUrl);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 500
    });
  }
};

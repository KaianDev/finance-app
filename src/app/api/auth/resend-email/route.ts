import { NextRequest, NextResponse } from "next/server";

import { backendApi } from "@/lib/api";

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    await backendApi.post("/auth/resend", data);
    return new NextResponse("Ok");
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 403
    });
  }
};

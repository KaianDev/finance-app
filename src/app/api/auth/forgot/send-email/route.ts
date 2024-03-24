import { NextRequest, NextResponse } from "next/server";

import { backendApi } from "@/lib/api";

interface ForgotSendEmailDataRequest {
  email: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const data = (await request.json()) as ForgotSendEmailDataRequest;
    await backendApi.post("/auth/forgot/sendmail", data);
    return new NextResponse(JSON.stringify({ message: "E-mail enviado" }), {
      status: 200
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 403
    });
  }
};

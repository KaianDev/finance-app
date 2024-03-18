import { NextRequest, NextResponse } from "next/server";

import { backendApi } from "@/lib/api";

export const POST = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("finance-app.create")?.value;
    await backendApi.post("/auth/resend", null, {
      headers: {
        activationToken: token
      }
    });
    return new NextResponse(JSON.stringify({ message: "E-mail enviado" }));
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 500
    });
  }
};

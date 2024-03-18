import { NextRequest, NextResponse } from "next/server";

import { backendApi } from "@/lib/api";

export const POST = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("finance-app.create")?.value;
    const data = await request.json();
    await backendApi.post("/auth/confirm", data, {
      headers: {
        activationToken: token
      }
    });
    return new NextResponse(JSON.stringify({ message: "Confirmado" }));
  } catch (e) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 500
    });
  }
};

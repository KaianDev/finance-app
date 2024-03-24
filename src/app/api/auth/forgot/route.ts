import { NextRequest, NextResponse } from "next/server";

import { backendApi } from "@/lib/api";

interface ForgetDataRequest {
  password: string;
  id: number;
  code: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const data = (await request.json()) as ForgetDataRequest;
    await backendApi.post("/auth/forgot", data);
    return new NextResponse(JSON.stringify({ message: "Senha alterada" }), {
      status: 200
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 403
    });
  }
};

import { NextRequest, NextResponse } from "next/server";

import { backendApi } from "@/lib/api";

export const POST = async (request: NextRequest) => {
  const data = await request.json();

  try {
    const results = await backendApi.post("auth/login", data);
    const token = results.data;
    return new NextResponse(JSON.stringify({ token }), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify({ message: "Ocorreu um erro" }), {
      status: 403
    });
  }
};

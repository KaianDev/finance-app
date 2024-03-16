import { NextRequest, NextResponse } from "next/server";

import { backendApi } from "@/lib/api";

interface IDataRequestBody {
  email: string;
  password: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const userData = (await request.json()) as IDataRequestBody;
    await backendApi.post("auth/create", userData);
    return new NextResponse(JSON.stringify({ message: "Usuário criado" }), {
      status: 201
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Ocorreu um erro" }), {
      status: 500
    });
  }
};

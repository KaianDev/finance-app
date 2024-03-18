import { NextRequest, NextResponse } from "next/server";

import { backendApi } from "@/lib/api";

interface IDataRequestBody {
  name: string;
  email: string;
  password: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const userData = (await request.json()) as IDataRequestBody;
    const results = await backendApi.post("auth/create", userData);
    const token = results.data.activationToken as string;
    return new NextResponse(JSON.stringify({ token }), {
      status: 201
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Ocorreu um erro" }), {
      status: 500
    });
  }
};

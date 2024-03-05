import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const authToken = request.cookies.get("finance-app.token")?.value;

  if (authToken) {
    const tokenIsValid = await validateToken(authToken);

    if (tokenIsValid) return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: ["/dashboard"]
};

interface BackendResponseToken {
  tokenValid: boolean;
}

const validateToken = async (token: string) => {
  try {
    const backendApi = process.env.NEXT_PUBLIC_BACKEND_API as string;
    const result = await fetch(`${backendApi}/auth/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ token })
    });

    const data = (await result.json()) as BackendResponseToken;
    return data.tokenValid;
  } catch (error) {
    return false;
  }
};

import { NextRequest } from "next/server";

export const getToken = (request: NextRequest) => {
  const authToken = request.cookies.get("finance-app.token")?.value;
  if (authToken) return authToken;
  return false;
};

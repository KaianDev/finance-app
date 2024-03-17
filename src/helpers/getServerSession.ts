import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import { CustomJwtDecoded } from "@/types/custom-jwt-decoded";

interface IGetServerSession {
  name: string;
  email: string;
}

export const getServerSession = (): IGetServerSession | false => {
  const cookieStore = cookies();
  const token = cookieStore.get("finance-app.token")?.value;
  if (token) {
    const decoded = jwtDecode<CustomJwtDecoded>(token);
    const session = {
      name: decoded.name,
      email: decoded.sub as string
    };
    return session;
  }
  return false;
};

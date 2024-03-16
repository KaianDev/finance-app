import { JwtPayload } from "jwt-decode";

export interface CustomJwtDecoded extends JwtPayload {
  name: string;
}

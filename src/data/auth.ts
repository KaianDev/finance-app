import { AxiosError } from "axios";

import { frontendApi } from "@/lib/api";

interface SignUpRequestData {
  email: string;
  password: string;
}
export const signUp = async ({ email, password }: SignUpRequestData) => {
  try {
    await frontendApi.post("/auth/sign-up", { email, password });
  } catch (e) {
    const axiosError = e as AxiosError;
    const status = axiosError.response?.status;
    if (status === 500) {
      throw new AxiosError("Ocorreu um erro no servidor, tente mais tarde");
    }
    throw new AxiosError("Ocorreu um erro desconhecido.");
  }
};

interface LoginRequestData {
  email: string;
  password: string;
}
export const login = async ({ email, password }: LoginRequestData) => {
  try {
    const results = await frontendApi.post("auth/login", { email, password });
    const token = results.data as string;
    return token;
  } catch (e) {
    const axiosError = e as AxiosError;
    const status = axiosError.response?.status;
    if (status === 500) {
      throw new AxiosError("Ocorreu um erro no servidor, tente mais tarde");
    }
    if (status === 403) {
      throw new AxiosError("E-mail e/ou Senha incorreto(s)");
    }
    throw new AxiosError("Erro desconhecido");
  }
};

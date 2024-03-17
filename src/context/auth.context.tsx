"use client";

import { AxiosError } from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

import { frontendApi } from "@/lib/api";
import { CustomJwtDecoded } from "@/types/custom-jwt-decoded";
import { Session } from "@/types/session";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface ConfirmEmailData {
  email: string;
  code: string;
}

interface IAuthContext {
  session: Session | null;
  userEmail: string | null;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
  confirmEmail: (data: ConfirmEmailData) => Promise<void>;
}

const AuthContext = createContext({} as IAuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const signIn = async (data: SignInData) => {
    try {
      const results = await frontendApi.post("auth/login", data);
      const token = results.data as string;

      if (token) {
        const decoded = jwtDecode<CustomJwtDecoded>(token);
        const { name, sub } = decoded;
        const user = { name, email: sub };
        setCookie("finance-app.token", token, {
          maxAge: 60 * 60 * 3 // 3 hours
        });
        setSession(user);
      }
    } catch (e) {
      const axiosError = e as AxiosError;
      const status = axiosError.response?.status;
      if (status === 403) {
        throw new AxiosError("E-mail e/ou Senha incorreto(s)");
      }
      throw new AxiosError("Ocorreu um erro no servidor, tente mais tarde");
    }
  };

  const signOut = () => {
    deleteCookie("finance-app.token");
    setSession(null);
  };

  const signUp = async (data: SignUpData) => {
    try {
      await frontendApi.post("/auth/sign-up", data);
      setUserEmail(data.email);
    } catch (e) {
      const axiosError = e as AxiosError;
      const status = axiosError.response?.status;
      if (status === 500) {
        throw new AxiosError("Ocorreu um erro no servidor, tente mais tarde");
      }
      throw new AxiosError("Ocorreu um erro desconhecido.");
    }
  };

  const confirmEmail = async (data: ConfirmEmailData) => {
    try {
      await frontendApi.post("/auth/confirm-email", data);
    } catch (e) {
      const axiosError = e as AxiosError;
      const status = axiosError.response?.status;
      if (status === 500) {
        throw new AxiosError("Ocorreu um erro no servidor, tente mais tarde");
      }
      throw new AxiosError("Ocorreu um erro desconhecido.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, userEmail, signIn, signOut, signUp, confirmEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

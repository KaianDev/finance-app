"use client";

import { AxiosError } from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { createContext, useContext } from "react";

import { frontendApi } from "@/lib/api";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface ForgotPasswordData {
  id: number;
  code: string;
  password: string;
}

interface IAuthContext {
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => void;
  confirmEmail: (code: string) => Promise<void>;
  reSendEmail: () => Promise<void>;
  forgotSendEmail: (email: string) => Promise<void>;
  forgotPassword: (data: ForgotPasswordData) => Promise<void>;
}

const AuthContext = createContext({} as IAuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const signIn = async (data: SignInData) => {
    try {
      const results = await frontendApi.post("auth/login", data);
      const token = results.data as string;

      if (token) {
        setCookie("finance-app.token", token, {
          maxAge: 60 * 60 * 3 // 3 hours
        });
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
  };

  const signUp = async (data: SignUpData) => {
    try {
      const results = await frontendApi.post("/auth/sign-up", data);
      const token = results.data.token as string;
      if (token) {
        setCookie("finance-app.create", token, {
          maxAge: 60 * 10 // 10 minutes
        });
      }
    } catch (e) {
      const axiosError = e as AxiosError;
      const status = axiosError.response?.status;
      if (status === 500) {
        throw new AxiosError("Ocorreu um erro no servidor, tente mais tarde");
      }
      throw new AxiosError("Ocorreu um erro desconhecido.");
    }
  };

  const confirmEmail = async (code: string) => {
    try {
      await frontendApi.post("/auth/confirm-email", { code });
      deleteCookie("finance-app.create");
    } catch (e) {
      const axiosError = e as AxiosError;
      const status = axiosError.response?.status;
      if (status === 500) {
        throw new AxiosError("Ocorreu um erro no servidor, tente mais tarde");
      }
      throw new AxiosError("Ocorreu um erro desconhecido.");
    }
  };

  const reSendEmail = async () => {
    try {
      await frontendApi.post("/auth/resend-email");
    } catch (e) {
      const axiosError = e as AxiosError;
      const status = axiosError.response?.status;
      if (status === 500) {
        throw new AxiosError("Ocorreu um erro no servidor, tente mais tarde");
      }
      throw new AxiosError("Ocorreu um erro desconhecido.");
    }
  };

  const forgotSendEmail = async (email: string) => {
    try {
      await frontendApi.post("/auth/forgot/send-email", { email });
    } catch (e) {
      const axiosError = e as AxiosError;
      const status = axiosError.response?.status;
      if (status === 500) {
        throw new AxiosError("Ocorreu um erro no servidor, tente mais tarde");
      }
      throw new AxiosError("Ocorreu um erro desconhecido.");
    }
  };

  const forgotPassword = async (data: ForgotPasswordData) => {
    try {
      await frontendApi.post("/auth/forgot", data);
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
      value={{
        signIn,
        signOut,
        signUp,
        confirmEmail,
        reSendEmail,
        forgotSendEmail,
        forgotPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

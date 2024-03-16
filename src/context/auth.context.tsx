"use client";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  setTokenOnCookies: (token: string) => void;
  signOut: () => void;
}

const AuthContext = createContext({} as IAuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cookie = getCookie("finance-app.token");
    const token = cookie?.toString();
    if (token) {
      setIsAuthenticated(!!token);
    }
  }, []);

  const setTokenOnCookies = (token: string) => {
    setCookie("finance-app.token", token, {
      maxAge: 60 * 60 * 3 // 3 hours
    });
    setIsAuthenticated(true);
  };

  const signOut = () => {
    deleteCookie("finance-app.token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setTokenOnCookies, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

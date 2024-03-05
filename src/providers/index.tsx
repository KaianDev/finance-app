"use client";

import { ThemeProvider } from "next-themes";

import { AuthContextProvider } from "@/context/auth.context";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthContextProvider>{children}</AuthContextProvider>
    </ThemeProvider>
  );
};

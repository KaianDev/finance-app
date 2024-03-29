"use client";

import { ThemeProvider } from "next-themes";

import { ActivityContextProvider } from "@/context/activity.context";
import { AuthContextProvider } from "@/context/auth.context";

import { TanstackProvider } from "./tanstack-provider";

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
      <AuthContextProvider>
        <ActivityContextProvider>
          <TanstackProvider>{children}</TanstackProvider>
        </ActivityContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

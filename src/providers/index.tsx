"use client";

import { ThemeProvider } from "next-themes";

import { AuthContextProvider } from "@/context/auth.context";
import { PdfContextProvider } from "@/context/pdf.context";

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
        <PdfContextProvider>
          <TanstackProvider>{children}</TanstackProvider>
        </PdfContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

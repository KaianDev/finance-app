import "./globals.css";

import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "600"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "fnce.",
  description: "Gerencie suas finança junto da gente."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="/assets/favicon.png"
          type="image/png"
          sizes="any"
        />
      </head>
      <body
        className={cn(
          fontSans.variable,
          "min-h-dvh bg-background font-sans antialiased"
        )}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

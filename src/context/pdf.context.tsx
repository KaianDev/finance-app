"use client";
import { createContext, useContext, useState } from "react";

interface IPdfContext {
  setPdf: (pdfBase64: string) => void;
  pdf: string;
}

const PdfContext = createContext({} as IPdfContext);

interface PdfContextProviderProvider {
  children: React.ReactNode;
}

export const PdfContextProvider = ({
  children
}: PdfContextProviderProvider) => {
  const [pdf, setPdf] = useState("");

  return (
    <PdfContext.Provider value={{ pdf, setPdf }}>
      {children}
    </PdfContext.Provider>
  );
};

export const usePdf = () => useContext(PdfContext);

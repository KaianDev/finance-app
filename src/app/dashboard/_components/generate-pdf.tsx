"use client";
import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPDF } from "@/data/activities";

export const GeneratePDF = () => {
  const handleGeneratePDFClick = async () => {
    const pdf = await getPDF();
    if (pdf) {
      const timestamp = new Date().getTime();
      const link = document.createElement("a");
      link.download = "filename_activities" + timestamp;
      link.href = pdf;
      link.click();
    }
  };

  return (
    <Button onClick={handleGeneratePDFClick}>
      Gerar Pdf
      <FileText className="ml-2 size-4" />
    </Button>
  );
};

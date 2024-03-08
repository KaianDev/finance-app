"use client";
import { FileText } from "lucide-react";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import { getPDF } from "@/data/activities";

export const GeneratePDF = () => {
  const [loading, setLoading] = useState(false);
  const handleGeneratePDFClick = async () => {
    setLoading(true);
    const pdf = await getPDF();
    if (pdf) {
      const timestamp = new Date().getTime();
      const link = document.createElement("a");
      link.download = "filename_activities" + timestamp;
      link.href = pdf;
      link.click();
    }
    setLoading(false);
  };

  return (
    <Button disabled={loading} onClick={handleGeneratePDFClick}>
      {loading ? (
        <ScaleLoader height={18} color="white" />
      ) : (
        <>
          Gerar Pdf
          <FileText className="ml-2 size-4" />
        </>
      )}
    </Button>
  );
};

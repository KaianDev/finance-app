"use client";
import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPDF } from "@/data/activities";

export const GeneratePDF = () => {
  const handleGeneratePDFClick = async () => {
    const pdf = await getPDF();
    if (pdf) {
      const debugBase64 = (base64URL: string) => {
        const win = window.open();

        win?.document.write(`<iframe
        src="${base64URL}"
        frameBorder={0}
        style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
      };
      debugBase64(pdf);
    }
  };

  return (
    <Button onClick={handleGeneratePDFClick}>
      Gerar Pdf
      <FileText className="ml-2 size-4" />
    </Button>
  );
};

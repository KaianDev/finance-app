"use client";

// import { useState } from "react";

import { Button } from "@/components/ui/button";
import { getPDF } from "@/data/activities";

export const GeneratePDF = () => {
  // const [pdfURL, setPdfURL] = useState("");
  const handleGeneratePDFClick = async () => {
    const pdf = await getPDF();
    if (pdf) {
      window.open(pdf, "_blank");
      // setPdfURL(pdf);
    }
  };

  return (
    <div>
      <Button onClick={handleGeneratePDFClick}>Gerar Pdf</Button>
      {/* <iframe src={pdfURL} width="100%" height="600px" allowFullScreen></iframe> */}
    </div>
  );
};

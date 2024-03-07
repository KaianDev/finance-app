"use client";
import { Button } from "@/components/ui/button";
// import { usePdf } from "@/context/pdf.context";
import { getPDF } from "@/data/activities";
// import { useRouter } from "next/navigation";

export const GeneratePDF = () => {
  // const { setPdf } = usePdf();
  // const router = useRouter();
  const handleGeneratePDFClick = async () => {
    const pdf = await getPDF();
    if (pdf) {
      // setPdf(pdf);
      // router.push("/pdf")
      window.open(pdf);
    }
  };

  return <Button onClick={handleGeneratePDFClick}>Gerar Pdf</Button>;
};

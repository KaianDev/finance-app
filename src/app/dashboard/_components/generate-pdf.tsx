"use client";
import { AxiosError } from "axios";
import { FileText } from "lucide-react";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getPDF } from "@/data/activities";
import { useActivity } from "@/lib/query";

export const GeneratePDF = () => {
  const { data, isLoading } = useActivity({});
  const [loading, setLoading] = useState(false);

  const handleGeneratePDFClick = async () => {
    try {
      setLoading(true);
      const pdf = await getPDF();
      if (pdf) {
        const timestamp = new Date().getTime();
        const link = document.createElement("a");
        link.download = "filename_activities" + timestamp;
        link.href = pdf;
        link.click();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast({
        title: "Erro",
        description: axiosError?.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  if (data?.length === 0 || isLoading) return null;
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

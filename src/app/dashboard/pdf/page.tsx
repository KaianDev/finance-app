"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { usePdf } from "@/context/pdf.context";
import { cn } from "@/lib/utils";

const PdfPage = () => {
  const { pdf } = usePdf();

  if (!pdf)
    return (
      <div className="mx-auto flex min-h-[calc(100vh-150px)] max-w-sm flex-col items-center justify-center px-4">
        <p className="mb-4 text-center">Ocorreu um erro!</p>
        <Link href="/dashboard" className={cn(buttonVariants(), "w-max")}>
          Voltar
        </Link>
      </div>
    );
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-190px)] flex-col items-center px-4">
      <Link href="/dashboard" className={cn(buttonVariants(), "my-5")}>
        Voltar
      </Link>
      <iframe
        title="activities"
        name="activities"
        className="min-h-[calc(100vh-240px)] w-[90%]"
        src={pdf}
      ></iframe>
    </div>
  );
};

export default PdfPage;

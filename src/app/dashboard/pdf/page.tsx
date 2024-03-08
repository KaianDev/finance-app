"use client";

import { usePdf } from "@/context/pdf.context";

const PdfPage = () => {
  const { pdf } = usePdf();

  if (!pdf) return;
  return (
    <div className="flex min-h-[calc(100vh-150px)]  justify-center ">
      <iframe
        className="my-5 min-h-[calc(100vh-150px)] w-[90%]"
        src={pdf}
      ></iframe>
    </div>
  );
};

export default PdfPage;

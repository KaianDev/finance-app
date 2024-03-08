"use client";

const PdfPage = () => {
  const pdfBase64 = localStorage.getItem("pdf-base64-file");

  if (!pdfBase64) return;
  return (
    <div className="flex min-h-[calc(100vh-150px)]  justify-center ">
      <iframe
        className="my-5 min-h-[calc(100vh-150px)] w-[90%]"
        src={pdfBase64}
      ></iframe>
    </div>
  );
};

export default PdfPage;

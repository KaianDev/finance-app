"use client";

// import { AxiosError } from "axios";
// import { useState } from "react";

import { Button } from "@/components/ui/button";
// import { toast } from "@/components/ui/use-toast";
// import { useAuth } from "@/context/auth.context";

export const ReSendEmail = () => {
  // const [loading, setLoading] = useState(false);
  // const {} = useAuth();

  const handleReSendEmailClick = () => {
    // setLoading(true);
    // if (loading) {
    //   toast({
    //     title: "Carregando.."
    //   });
    // }
    // try {
    // } catch (e) {
    //   const axiosError = e as AxiosError;
    //   toast({
    //     title: "Erro",
    //     description: axiosError.message
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Button
      onClick={handleReSendEmailClick}
      variant="link"
      className="px-1 text-emerald-500 "
    >
      Reenviar e-mail
    </Button>
  );
};

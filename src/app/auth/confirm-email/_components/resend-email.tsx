"use client";

import { AxiosError } from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth.context";

export const ReSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const { reSendEmail } = useAuth();

  const handleReSendEmailClick = async () => {
    setLoading(true);
    if (loading) {
      toast({
        title: "Enviando...",
        description: "Estamos enviando um e-mail com o código"
      });
    }
    try {
      await reSendEmail();
      toast({
        title: "Enviado",
        description: "E-mail com código enviado."
      });
    } catch (e) {
      const axiosError = e as AxiosError;
      toast({
        title: "Erro",
        description: axiosError.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleReSendEmailClick}
      type="button"
      variant="link"
      className="px-1 text-emerald-500"
      disabled={loading}
    >
      Reenviar e-mail
    </Button>
  );
};

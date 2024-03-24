"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth.context";

const forgotPasswordSendEmailForm = z.object({
  email: z.string().email("Endereço de e-mail inválido")
});

type ForgotPasswordSendEmailForm = z.infer<typeof forgotPasswordSendEmailForm>;

export const ForgotSendEmailForm = () => {
  const [loading, setLoading] = useState(false);
  const { forgotSendEmail } = useAuth();

  const form = useForm<ForgotPasswordSendEmailForm>({
    resolver: zodResolver(forgotPasswordSendEmailForm),
    defaultValues: {
      email: ""
    }
  });

  const onForgotPasswordSubmit = async (data: ForgotPasswordSendEmailForm) => {
    try {
      setLoading(true);
      await forgotSendEmail(data.email);
      toast({
        title: "Sucesso",
        description: "E-mail enviado com sucesso"
      });
    } catch (e) {
      const axiosError = e as AxiosError;
      toast({
        variant: "destructive",
        title: "Erro",
        description: axiosError.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onForgotPasswordSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl className="bg-background">
                <Input type="text" placeholder="Digite seu e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading}>
          {!loading ? "Enviar" : <ScaleLoader height={18} color="white" />}
        </Button>
      </form>
    </Form>
  );
};

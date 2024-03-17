"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth.context";

const confirmEmailSchema = z.object({
  code: z.string().min(4, {
    message: "Seu código tem que ter 4 caracteres"
  })
});

type ConfirmEmailSchema = z.infer<typeof confirmEmailSchema>;

export const ConfirmEmailForm = () => {
  const [loading, setLoading] = useState(false);
  const { confirmEmail } = useAuth();
  const router = useRouter();

  const form = useForm<ConfirmEmailSchema>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: {
      code: ""
    }
  });

  const handleConfirmEmailSubmit = async (data: ConfirmEmailSchema) => {
    setLoading(true);

    try {
      const { code } = data;
      await confirmEmail(code);
      toast({
        title: "Sucesso",
        description: "Código confirmado com sucesso..."
      });
      router.replace("/");
    } catch (error) {
      const axiosError = error as AxiosError;
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
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit(handleConfirmEmailSubmit)}
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insira seu código</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
                      ))}
                    </InputOTPGroup>
                  )}
                  {...field}
                />
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

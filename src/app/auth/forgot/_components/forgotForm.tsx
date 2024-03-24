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
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth.context";

const forgotPasswordForm = z.object({
  password: z.string().min(4, "A senha deve conter no mínimo 4 caracteres"),
  passwordConfirm: z
    .string()
    .min(4, "A senha deve conter no mínimo 4 caracteres")
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordForm>;

interface ForgotFormProps {
  id: string;
  code: string;
}

export const ForgotForm = ({ id, code }: ForgotFormProps) => {
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();
  const router = useRouter();

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordForm),
    defaultValues: {
      password: "",
      passwordConfirm: ""
    }
  });

  const onForgotPasswordSubmit = async (data: ForgotPasswordForm) => {
    if (data.password !== data.passwordConfirm) {
      form.setError("passwordConfirm", {
        message: "As senhas não conferem"
      });
      return;
    }

    try {
      setLoading(true);
      await forgotPassword({ code, id: parseInt(id), password: data.password });
      toast({
        title: "Sucesso",
        description: "Senha redefinida com sucesso"
      });
      router.replace("/");
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl className="bg-background">
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl className="bg-background">
                <Input
                  type="password"
                  placeholder="Confirme sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading}>
          {!loading ? "Redefinir" : <ScaleLoader height={18} color="white" />}
        </Button>
      </form>
    </Form>
  );
};

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
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth.context";

const signUpForm = z.object({
  name: z.string({ required_error: "Campo obrigatório" }),
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(4, "A senha deve conter no mínimo 4 caracteres"),
  passwordConfirm: z
    .string()
    .min(4, "A senha deve conter no mínimo 4 caracteres")
});

type SignUpForm = z.infer<typeof signUpForm>;

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();
  const { toast } = useToast();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      name: undefined,
      email: "",
      password: "",
      passwordConfirm: ""
    }
  });

  const onSignUpSubmit = async (data: SignUpForm) => {
    if (data.password !== data.passwordConfirm) {
      form.setError("passwordConfirm", {
        message: "As senhas não conferem"
      });
      return;
    }
    const { name, email, password } = data;
    setLoading(true);
    try {
      await signUp({ name, email, password });
      router.replace("/auth/confirm-email");
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
      <form onSubmit={form.handleSubmit(onSignUpSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl className="bg-background">
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl className="bg-background">
                <Input placeholder="Digite seu e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          {!loading ? "Cadastrar" : <ScaleLoader height={18} color="white" />}
        </Button>
      </form>
    </Form>
  );
};

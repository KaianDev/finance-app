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
import { login } from "@/data/auth";

const loginFormSchema = z.object({
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(4, "A senha deve conter no mínimo 4 caracteres")
});

type LoginSchemaType = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { setTokenOnCookies } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onLoginSubmit = async (data: LoginSchemaType) => {
    try {
      setLoading(true);

      const token = await login(data);
      if (token) {
        setTokenOnCookies(token);
        router.push("/dashboard");
      }
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
      <form onSubmit={form.handleSubmit(onLoginSubmit)} className="space-y-5">
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
        <Button disabled={loading}>
          {!loading ? "Entrar" : <ScaleLoader height={18} color="white" />}
        </Button>
      </form>
    </Form>
  );
};

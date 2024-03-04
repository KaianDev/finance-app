"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
// Utilities
import { frontendApi } from "@/lib/api";

const loginFormSchema = z.object({
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(4, "A senha deve conter no mínimo 4 caracteres")
});

type LoginSchemaType = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
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
      const results = await frontendApi.post("auth/login", data);
      const token = results.data;
      if (token) {
        router.push("/dashboard");
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "E-mail e/ou senha inválidos"
      });
    }
  };

  return (
    <Card className="bg-zinc-200 dark:bg-card">
      <CardHeader>
        <CardTitle>Fazer Login</CardTitle>
        <CardDescription>
          Faça seu login e gerencie suas finanças
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onLoginSubmit)}
            className="space-y-4"
          >
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
            <Button>Entrar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

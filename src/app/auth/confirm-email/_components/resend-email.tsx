"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
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

const reSendEmailSchema = z.object({
  email: z.string().email()
});

type ReSendEmailSchema = z.infer<typeof reSendEmailSchema>;

export const ReSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const { reSendEmail } = useAuth();

  const form = useForm<ReSendEmailSchema>({
    resolver: zodResolver(reSendEmailSchema),
    defaultValues: {
      email: ""
    }
  });

  const handleReSendEmailClick = async (data: ReSendEmailSchema) => {
    setLoading(true);
    if (loading) {
      toast({
        title: "Enviando..."
      });
    }
    try {
      await reSendEmail(data.email);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="link" className="px-1 text-emerald-500 ">
          Reenviar e-mail
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reenviar E-mail</DialogTitle>
          <DialogDescription>
            Informe seu e-mail para que possamos reenviar o código
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleReSendEmailClick)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Enviar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

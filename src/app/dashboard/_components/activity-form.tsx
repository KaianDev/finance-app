"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useActivity } from "@/context/activity.context";
import { frontendApi } from "@/lib/api";
import { cn } from "@/lib/utils";

import { DatePicker } from "./date-picker";

enum EnumType {
  REVENUE = "REVENUE",
  EXPENSE = "EXPENSE"
}

const activityFormSchema = z.object({
  date: z.date({ required_error: "O campo é obrigatório" }),
  description: z
    .string({
      required_error: "O campo é obrigatório"
    })
    .min(2, "Campo obrigatório"),
  value: z.coerce
    .number({
      required_error: "O campo é obrigatório",
      invalid_type_error: "Insira um valor"
    })
    .min(0.01, "O valor inválido"),
  type: z.nativeEnum(EnumType, { required_error: "O campo é obrigatório" })
});

type ActivityFormSchemaType = z.infer<typeof activityFormSchema>;

export const ActivityForm = () => {
  const { refreshActivities } = useActivity();
  const form = useForm<ActivityFormSchemaType>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      date: new Date(),
      description: "",
      value: 0
    }
  });

  const hasError =
    form.formState.errors.date ||
    form.formState.errors.description ||
    form.formState.errors.type ||
    form.formState.errors.value;

  const handleInsertActivitySubmit = async (data: ActivityFormSchemaType) => {
    try {
      const results = await frontendApi.post("/activities", data);
      if (results) {
        await refreshActivities();
        toast({
          title: "Atividade Inserida",
          description: `A ${data.type === "REVENUE" ? "receita" : "despesa"} foi inserida com sucesso!`
        });
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao inserir atividade!",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2>Insira suas atividades</h2>
      <Form {...form}>
        <form
          className={cn(
            "flex flex-col gap-5 md:flex-row",
            hasError ? "md:items-start" : "md:items-end"
          )}
          onSubmit={form.handleSubmit(handleInsertActivitySubmit)}
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full md:w-max">
                <FormLabel>Data</FormLabel>
                <DatePicker setDate={field.onChange} date={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Descrição</FormLabel>
                <FormControl className="w-full bg-background">
                  <Input placeholder="Digite uma atividade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="w-full md:w-[350px]">
                <FormLabel>Valor</FormLabel>
                <FormControl className="bg-background">
                  <Input
                    placeholder="Digite o valor"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full md:w-[450px]">
                <FormLabel>Tipo</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className="bg-background">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EnumType.REVENUE}>Receita</SelectItem>
                    <SelectItem value={EnumType.EXPENSE}>Despesa</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={cn(hasError ? "md:self-center" : "md:self-end")}>
            <Button type="submit">Adicionar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

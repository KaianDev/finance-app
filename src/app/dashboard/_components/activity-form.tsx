"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
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
import { getDateConverter } from "@/helpers/getDateConverter";
import { useAddActivity } from "@/lib/mutation";
import { cn } from "@/lib/utils";

import { DatePicker } from "./date-picker";

const activityFormSchema = z.object({
  date: z.date({ required_error: "O campo é obrigatório" }),
  description: z
    .string({
      required_error: "O campo é obrigatório"
    })
    .min(2, "Campo obrigatório"),
  value: z.coerce
    .string({
      required_error: "O campo é obrigatório",
      invalid_type_error: "Insira um valor"
    })
    .min(1, "Campo obrigatório"),
  type: z.enum(["REVENUE", "EXPENSE"], {
    required_error: "O campo é obrigatório"
  })
});

type ActivityFormSchemaType = z.infer<typeof activityFormSchema>;

export const ActivityForm = () => {
  const addActivity = useAddActivity();
  const form = useForm<ActivityFormSchemaType>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      date: new Date(),
      description: "",
      value: ""
    }
  });

  const hasError =
    form.formState.errors.date ||
    form.formState.errors.description ||
    form.formState.errors.type ||
    form.formState.errors.value;

  const handleInsertActivitySubmit = async (data: ActivityFormSchemaType) => {
    const numValue = parseFloat(data.value);
    if (isNaN(numValue)) {
      form.setError("value", {
        type: "manual",
        message: "Insira um valor"
      });
      return;
    }
    if (numValue < 0) {
      form.setError("value", {
        type: "nonPositiveValue",
        message: "Insira um valor válido"
      });
      return;
    }
    if (numValue === 0) {
      form.setError("value", {
        type: "zeroValue",
        message: "Insira um valor válido"
      });
      return;
    }
    await addActivity.mutateAsync(
      {
        ...data,
        date: getDateConverter(data.date),
        type: data.type === "REVENUE" ? "REVENUE" : "EXPENSE",
        value: numValue
      },
      {
        onSuccess() {
          toast({
            title: "Atividade Inserida",
            description: `A ${data.type === "REVENUE" ? "receita" : "despesa"} foi inserida com sucesso!`
          });
          form.reset();
          form.setValue("type", data.type);
        },
        onError() {
          toast({
            title: "Erro",
            description: "Erro ao inserir atividade!",
            variant: "destructive"
          });
        }
      }
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-center text-2xl font-semibold text-emerald-500">
        Insira suas atividades
      </h2>
      <Form {...form}>
        <form
          className={cn(
            "flex flex-col gap-5 md:flex-row",
            hasError ? "md:items-start" : "md:items-end"
          )}
          method="post"
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="bg-background">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="REVENUE">Receita</SelectItem>
                    <SelectItem value="EXPENSE">Despesa</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={cn(hasError ? "md:self-center" : "md:self-end")}>
            <Button type="submit" className="w-full">
              <Plus className="mr-2" />
              Adicionar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

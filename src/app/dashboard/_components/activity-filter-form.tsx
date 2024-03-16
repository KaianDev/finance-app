"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SheetClose } from "@/components/ui/sheet";
import { useFilterContext } from "@/context/filter.context";
import { getDateConverter } from "@/helpers/getDateConverter";

const activityFilterSchema = z.object({
  date: z
    .object({
      from: z.date().optional(),
      to: z.date().optional()
    })
    .optional(),
  typeValue: z.enum(["expense", "revenue"]).optional()
});

type ActivityFilterSchema = z.infer<typeof activityFilterSchema>;

export const ActivityFilterForm = () => {
  const { setEnabled, setFilter } = useFilterContext();

  const form = useForm<ActivityFilterSchema>({
    resolver: zodResolver(activityFilterSchema),
    defaultValues: {
      date: {
        from: undefined,
        to: undefined
      },
      typeValue: undefined
    }
  });

  const handleActivityFilterSubmit = (data: ActivityFilterSchema) => {
    setFilter({
      oneDate: data.date?.from ? getDateConverter(data.date.from) : undefined,
      secondDate: data.date?.to ? getDateConverter(data.date.to) : undefined,
      typeValue: data.typeValue
    });
    setEnabled(true);
  };

  const handleActivityFilterClear = () => {
    setEnabled(false);
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="mt-4 space-y-4"
          onSubmit={form.handleSubmit(handleActivityFilterSubmit)}
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Data(s)</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <CalendarIcon size={16} className="mr-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Selecione uma ou duas data(s)</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value as DateRange | undefined}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="typeValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Tipo</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="revenue" />
                      </FormControl>
                      <FormLabel>Receitas</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="expense" />
                      </FormControl>
                      <FormLabel>Despesas</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="mt-8 space-x-4">
            <SheetClose>
              <Button type="submit">Filtrar</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={handleActivityFilterClear}
              >
                Limpar Filtros
              </Button>
            </SheetClose>
          </div>
        </form>
      </Form>
    </div>
  );
};

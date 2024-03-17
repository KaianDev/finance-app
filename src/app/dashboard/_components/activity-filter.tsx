"use client";

import { FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useFilterContext } from "@/context/filter.context";

import { ActivityFilterForm } from "./activity-filter-form";

export const ActivityFilter = () => {
  const { enabled, setEnabled } = useFilterContext();

  return (
    <div className="mt-4 flex items-center justify-between gap-4 sm:justify-start">
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <FilterIcon size={16} className="mr-2" /> Filtros
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full">
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
            <Separator />
          </SheetHeader>
          <ActivityFilterForm />
        </SheetContent>
      </Sheet>

      {enabled && (
        <Button variant="outline" onClick={() => setEnabled(false)}>
          Limpar Filtros
        </Button>
      )}
    </div>
  );
};

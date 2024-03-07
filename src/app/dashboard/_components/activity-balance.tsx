"use client";

import { useActivityBalance } from "@/lib/query";
import { cn } from "@/lib/utils";

export const ActivityBalance = () => {
  const { data } = useActivityBalance();

  if (data) {
    const formattedBalance = {
      value: data.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
      }),
      color: data > 0 ? "text-green-500" : "text-red-500"
    };

    return (
      <div className="py-5 text-xl font-bold">
        Total:{" "}
        <span className={cn(formattedBalance.color)}>
          {formattedBalance.value}
        </span>
      </div>
    );
  }

  return <div className="py-5">Calculando...</div>;
};

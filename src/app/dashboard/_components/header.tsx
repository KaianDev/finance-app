import { CircleDollarSign } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Header = () => {
  return (
    <header>
      <Card className="flex items-center justify-between rounded-t-none pr-5">
        <CardContent>
          <Link href="/dashboard">
            <div className="flex items-center gap-2 pt-5">
              <CircleDollarSign size={40} className="text-primary" />
              <h1 className="text-2xl font-bold">Money Manager</h1>
            </div>
          </Link>
        </CardContent>

        <Button variant="destructive">Sair</Button>
      </Card>
    </header>
  );
};

import { CircleDollarSign } from "lucide-react";
import Link from "next/link";

import { SignOutButton } from "@/components/sign-out-button";
import { Card, CardContent } from "@/components/ui/card";

export const Header = () => {
  return (
    <header>
      <Card className="flex items-center justify-between rounded-t-none border-0 bg-zinc-800 pr-5 dark:bg-card">
        <CardContent>
          <Link href="/dashboard">
            <div className="flex items-center gap-2 pt-5">
              <CircleDollarSign size={40} className="text-primary" />
              <h1 className="text-3xl font-bold text-white">fnce.</h1>
            </div>
          </Link>
        </CardContent>

        <SignOutButton />
      </Card>
    </header>
  );
};

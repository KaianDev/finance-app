import Image from "next/image";
import Link from "next/link";

import { SignOutButton } from "@/components/sign-out-button";
import { Card, CardContent } from "@/components/ui/card";
import { getServerSession } from "@/helpers/getServerSession";

export const Header = () => {
  const session = getServerSession();
  return (
    <header>
      <Card className="rounded-t-none border-0 bg-zinc-800 pr-5 dark:bg-card">
        <div className="flex items-center justify-between sm:container">
          <CardContent className="py-3 md:p-6 md:pt-6">
            <Link href="/dashboard">
              <Image
                src="/assets/fnce.png"
                alt="Logo fnce."
                width={0}
                height={0}
                sizes="100%"
                className="aspect-auto h-auto w-16 p-0 sm:w-20 md:w-28"
              />
            </Link>
          </CardContent>
          <div className="flex items-center justify-center gap-4">
            {session && (
              <p className="text-sm capitalize text-white sm:text-base">
                Olá, {session.name.split(" ")[0]}
              </p>
            )}
            <SignOutButton />
          </div>
        </div>
      </Card>
    </header>
  );
};

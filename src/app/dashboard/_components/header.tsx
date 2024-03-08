import Image from "next/image";
import Link from "next/link";

import { SignOutButton } from "@/components/sign-out-button";
import { Card, CardContent } from "@/components/ui/card";

export const Header = () => {
  return (
    <header>
      <Card className="flex items-center justify-between rounded-t-none border-0 bg-zinc-800 pr-5 dark:bg-card">
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

        <SignOutButton />
      </Card>
    </header>
  );
};

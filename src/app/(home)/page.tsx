import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "@/app/(home)/_components/login-form";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Login | fnce"
};

const HomePage = () => {
  return (
    <div className="py-5 sm:pt-10">
      <header className="flex items-center justify-center gap-2 py-5">
        <Image
          src="/assets/fnce.png"
          alt="Logo fnce."
          width={0}
          height={0}
          sizes="100%"
          className="h-auto w-36 sm:mb-8"
        />
      </header>
      <div className="fixed right-4 top-4">
        <ModeToggle />
      </div>
      <div className="mx-auto max-w-xl px-4 ">
        <Card className="bg-zinc-200 dark:bg-card">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Preencha os campos abaixo e junte-se a nós
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <LoginForm />
            <div className="border-t border-zinc-300 dark:border-zinc-800" />
            <div className="text-center text-sm">
              Ainda não tem uma conta?{" "}
              <Link
                href="/sign-up"
                className="text-emerald-500 hover:underline"
              >
                Clique aqui
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;

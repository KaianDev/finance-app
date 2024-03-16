import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { SignUpForm } from "./_components/sign-up-form";

export const metadata: Metadata = {
  title: "Cadastre-se | fnce"
};

export default function Home() {
  return (
    <div className="pt-28">
      <header className="flex items-center justify-center gap-2 py-5">
        <Image
          src="/assets/fnce.png"
          alt="Logo fnce."
          width={0}
          height={0}
          sizes="100%"
          className="mb-8 h-auto w-36"
        />
      </header>
      <div className="fixed right-4 top-4">
        <ModeToggle />
      </div>
      <div className="mx-auto max-w-xl px-4 ">
        <Card className="bg-zinc-200 dark:bg-card">
          <CardHeader>
            <CardTitle>Cadastre-se</CardTitle>
            <CardDescription>
              Preencha os campos abaixo e junte-se a nós
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <SignUpForm />
            <div className="border-t-2" />
            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/" className="text-emerald-500 hover:underline">
                Clique aqui
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

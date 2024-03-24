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

import { ForgotForm } from "../../_components/forgotForm";

interface ForgetPasswordPros {
  params: {
    code: string;
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Esqueceu Senha | fnce."
};

const ForgotPasswordPage = ({ params }: ForgetPasswordPros) => {
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
            <CardTitle>Redefinir Senha</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Preencha os campos abaixo para redefinir sua senha
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <ForgotForm id={params.id} code={params.code} />
            <div className="border-t border-zinc-300 dark:border-zinc-800" />
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
};

export default ForgotPasswordPage;

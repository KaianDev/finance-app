import { Metadata } from "next";
import Image from "next/image";

import { ModeToggle } from "@/components/mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { ConfirmEmailForm } from "./_components/confirm-email-form";
import { ReSendEmail } from "./_components/resend-email";

export const metadata: Metadata = {
  title: "Confirmar E-mail | fnce"
};

const ConfirmEmailPage = () => {
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
            <CardTitle>Confirmação de Inscrição</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <CardDescription className="text-sm">
              Por favor, insira o token que você recebeu em seu email para
              confirmar sua inscrição:
            </CardDescription>

            <ConfirmEmailForm />

            <div className="border-t border-zinc-300 dark:border-zinc-800" />
            <CardDescription>
              Se não recebeu o token clique em <ReSendEmail /> que estaremos
              enviando um novo token.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default ConfirmEmailPage;

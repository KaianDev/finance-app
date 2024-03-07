import Image from "next/image";

import { LoginForm } from "@/app/(home)/_components/login-form";
import { ModeToggle } from "@/components/mode-toggle";

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
        <LoginForm />
      </div>
    </div>
  );
}

import { CircleDollarSign } from "lucide-react";

import { LoginForm } from "@/app/(home)/_components/login-form";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div>
      <header className="flex items-center justify-center gap-2 py-10">
        <CircleDollarSign size={40} className="text-primary" />
        <h1 className="text-3xl font-bold">fnce.</h1>
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

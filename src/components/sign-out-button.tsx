"use client";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/auth.context";

import { Button } from "./ui/button";

export const SignOutButton = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOutClick = () => {
    signOut();
    router.replace("/");
  };

  return (
    <Button variant="destructive" onClick={handleSignOutClick}>
      Sair
    </Button>
  );
};

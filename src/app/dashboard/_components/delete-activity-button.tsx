"use client";

import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useActivity } from "@/context/activity.context";
import { Activity } from "@/types/activity";

interface DeleteActivityButtonProps {
  activity: Activity;
}

export const DeleteActivityButton = ({
  activity
}: DeleteActivityButtonProps) => {
  const { deleteActivity, refreshActivities } = useActivity();

  const handleDeleteClick = async () => {
    try {
      await deleteActivity(activity.id);
      await refreshActivities();
      toast({
        title: "Atividade Excluída",
        description: "Atividade excluída com sucesso"
      });
    } catch (e) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao tentar excluir a atividade",
        variant: "destructive"
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Trash2 className="size-5 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-2 border-red-500">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Você esta tentando excluir a atividade "${activity.description}"`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteClick}
            className={buttonVariants({ variant: "destructive" })}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

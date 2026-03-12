"use client";

import { Trash2 } from "lucide-react";
import { deleteCar } from "@/app/actions/carDelete";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type DeleteCarAlertDialogProps = {
  id: number;
  slug: string;
  name: string;
};

export function DeleteCarAlertDialog({
  id,
  slug,
  name,
}: DeleteCarAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive">
          <Trash2 className="h-4 w-4" />
          Smazat
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Opravdu smazat auto?</AlertDialogTitle>
          <AlertDialogDescription>
            Chystáte se smazat auto <strong>{name}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Zrušit</AlertDialogCancel>
          <form action={deleteCar}>
            <input name="id" type="hidden" value={id} />
            <input name="slug" type="hidden" value={slug} />
            <AlertDialogAction type="submit">Smazat auto</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

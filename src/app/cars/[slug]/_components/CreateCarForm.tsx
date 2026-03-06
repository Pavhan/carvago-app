"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  type CreateCarActionState,
  createCarAction,
} from "@/app/actions/carCreate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarFormFields } from "./CarFormFields";

const initialState: CreateCarActionState = {};

export function CreateCarForm() {
  const [state, formAction, isPending] = useActionState(
    createCarAction,
    initialState,
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={formAction} className="grid gap-4 md:grid-cols-2">
          <CarFormFields fieldErrors={state.fieldErrors} />

          {state.message && (
            <p className="text-sm text-red-600 md:col-span-2">
              {state.message}
            </p>
          )}

          <div className="flex items-center gap-3 md:col-span-2">
            <Button disabled={isPending} type="submit">
              {isPending ? "Ukládám…" : "Uložit auto"}
            </Button>
            <Link className="text-sm underline" href="/cars">
              Zpět na výpis
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  type CreateCarActionState,
  createCarAction,
} from "@/app/actions/carCreate";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { CarFormFields } from "./CarFormFields";

const initialState: CreateCarActionState = {};

export function CreateCarForm() {
  const [state, formAction] = useActionState(createCarAction, initialState);

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={formAction} noValidate className="space-y-4">
          <CarFormFields fieldErrors={state.fieldErrors} />

          {state.message && (
            <p className="text-sm text-red-600 md:col-span-2">
              {state.message}
            </p>
          )}

          <div className="flex items-center gap-3 md:col-span-2">
            <LoadingButton type="submit" size="lg">
              Uložit auto
            </LoadingButton>
            <Link className="text-sm underline" href="/">
              Zpět na výpis
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

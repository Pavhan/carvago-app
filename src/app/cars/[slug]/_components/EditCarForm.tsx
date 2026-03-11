"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import {
  type UpdateCarActionState,
  updateCarAction,
} from "@/app/actions/carUpdate";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { CarFormFields, type CarFormValues } from "./CarFormFields";

type EditCarFormProps = {
  carId: number;
  slug: string;
  initialValues: CarFormValues;
};

const initialState: UpdateCarActionState = {};

export function EditCarForm({ carId, slug, initialValues }: EditCarFormProps) {
  const [state, formAction] = useActionState(updateCarAction, initialState);

  useEffect(() => {
    if (!state.status || !state.message) {
      return;
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card>
      <CardContent className="pt-6">
        <form
          action={formAction}
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          <input name="id" type="hidden" value={carId} />
          <input name="slug" type="hidden" value={slug} />

          <CarFormFields
            defaultValues={initialValues}
            fieldErrors={state.fieldErrors}
          />

          {state.message && state.status === "error" && !state.fieldErrors && (
            <p className="text-sm text-red-600 md:col-span-2">
              {state.message}
            </p>
          )}

          <div className="flex items-center gap-3 md:col-span-2">
            <LoadingButton type="submit">Uložit změny</LoadingButton>
            <Link className="text-sm underline" href={`/cars/${slug}`}>
              Zpět na detail
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

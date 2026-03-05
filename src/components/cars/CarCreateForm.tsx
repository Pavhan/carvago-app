'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { type CreateCarActionState, createCarAction } from '@/app/actions/cars';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/form/FormField';

const initialState: CreateCarActionState = {};

export function CarCreateForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createCarAction,
    initialState,
  );

  useEffect(() => {
    if (state.slug) {
      router.push(`/cars/${state.slug}`);
    }
  }, [router, state.slug]);

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={formAction} className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Název"
            name="name"
            error={state.fieldErrors?.name?.[0]}
            required
          />
          <FormField
            label="URL obrázku"
            name="imageUrl"
            error={state.fieldErrors?.imageUrl?.[0]}
            required
          />
          <FormField
            label="Nájezd (km)"
            name="mileageKm"
            type="number"
            error={state.fieldErrors?.mileageKm?.[0]}
            required
          />
          <FormField
            label="První registrace (MM/RRRR)"
            name="firstRegistration"
            error={state.fieldErrors?.firstRegistration?.[0]}
            required
          />
          <FormField
            label="Výkon (kW)"
            name="powerKw"
            type="number"
            error={state.fieldErrors?.powerKw?.[0]}
            required
          />
          <FormField
            label="Výkon (hp)"
            name="powerHp"
            type="number"
            error={state.fieldErrors?.powerHp?.[0]}
            required
          />
          <FormField
            label="Převodovka"
            name="transmission"
            error={state.fieldErrors?.transmission?.[0]}
            required
          />
          <FormField
            label="Palivo"
            name="fuelType"
            error={state.fieldErrors?.fuelType?.[0]}
            required
          />
          <FormField
            label="Země"
            name="locationCountry"
            error={state.fieldErrors?.locationCountry?.[0]}
            required
          />
          <FormField
            label="Doručení (Kč)"
            name="deliveryPriceCzk"
            type="number"
            error={state.fieldErrors?.deliveryPriceCzk?.[0]}
            required
          />
          <FormField
            label="Měsíční splátka (Kč)"
            name="monthlyPaymentCzk"
            type="number"
            error={state.fieldErrors?.monthlyPaymentCzk?.[0]}
            required
          />
          <FormField
            label="Celková cena (Kč)"
            name="totalPriceCzk"
            type="number"
            error={state.fieldErrors?.totalPriceCzk?.[0]}
            required
          />
          <FormField
            label="Cena bez DPH (Kč)"
            name="vatPriceCzk"
            type="number"
            error={state.fieldErrors?.vatPriceCzk?.[0]}
            required
          />
          <FormField
            label="Hodnocení ceny"
            name="priceRatingLabel"
            error={state.fieldErrors?.priceRatingLabel?.[0]}
            required
          />
          <FormField
            label="Partner label"
            name="partnerLabel"
            error={state.fieldErrors?.partnerLabel?.[0]}
            required
          />

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="equipmentTags">Výbava (odděl čárkou)</Label>
            <Textarea id="equipmentTags" name="equipmentTags" required />
            {state.fieldErrors?.equipmentTags?.[0] && (
              <p className="text-sm text-red-600">
                {state.fieldErrors.equipmentTags[0]}
              </p>
            )}
          </div>

          {state.message && (
            <p className="md:col-span-2 text-sm text-red-600">
              {state.message}
            </p>
          )}

          <div className="md:col-span-2 flex items-center gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Ukládám…' : 'Uložit auto'}
            </Button>
            <Link href="/cars" className="text-sm underline">
              Zpět na výpis
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

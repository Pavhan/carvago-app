import { Suspense } from "react";
import { CreateCarForm } from "@/app/cars/[slug]/_components/CreateCarForm";
import { Spinner } from "@/components/ui/spinner";

export default function NewCarPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Přidat nové auto</h1>
      <Suspense
        fallback={
          <div className="flex min-h-32 items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <CreateCarForm />
      </Suspense>
    </div>
  );
}

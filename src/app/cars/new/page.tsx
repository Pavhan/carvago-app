import { CreateCarForm } from "@/app/cars/[slug]/_components/CreateCarForm";

export default function NewCarPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Přidat nové auto</h1>
      <CreateCarForm />
    </div>
  );
}

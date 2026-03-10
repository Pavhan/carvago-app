import { notFound } from "next/navigation";
import { EditCarForm } from "@/app/cars/[slug]/_components/EditCarForm";
import { BackButton } from "@/components/BackButton";
import { getCarBySlug } from "@/lib/cars";

export default async function CarEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <BackButton href={`/cars/${slug}`} />
      <h1 className="text-3xl font-semibold">Upravit auto</h1>
      <EditCarForm
        carId={car.id}
        initialValues={{
          name: car.name,
          imageUrl: car.imageUrl,
          transmission: car.transmission,
          fuelType: car.fuelType,
          price: car.price,
        }}
        slug={car.slug}
      />
    </div>
  );
}

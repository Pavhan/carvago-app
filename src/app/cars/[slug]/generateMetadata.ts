import type { Metadata } from "next";
import { getCarBySlug } from "@/lib/cars";

const CARVAGO_BASE_URL = "https://carvago.cz";

function createCarDescription(car: {
  mileageKm: number;
  firstRegistration: string;
  fuelType: string;
  transmission: string;
  powerKw: number;
}) {
  return `${car.mileageKm} km, první registrace ${car.firstRegistration}, ${car.fuelType}, ${car.transmission}, ${car.powerKw} kW.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    return {
      title: "Vozidlo nenalezeno | Carvago",
    };
  }

  const carUrl = `${CARVAGO_BASE_URL}/cars/${car.slug}`;
  const description = createCarDescription(car);

  return {
    title: `${car.name} | Carvago`,
    description,
    openGraph: {
      title: car.name,
      description,
      url: carUrl,
      images: [{ url: car.imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: car.name,
      description,
      images: [car.imageUrl],
    },
    alternates: {
      canonical: carUrl,
      languages: {
        cs: carUrl,
        en: `https://carvago.co.uk/cars/${car.slug}`,
        de: `https://carvago.de/autos/${car.slug}`,
      },
    },
  };
}

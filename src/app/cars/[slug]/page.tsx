import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/helpers/formatPrice';
import { getCarBySlug } from '@/lib/cars';


export default async function CarDetailPage({
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
    <Card className="overflow-hidden">
      <div className="grid gap-4 md:grid-cols-2">
        <Image
          alt={car.name}
          className="h-full min-h-64 w-full object-cover"
          src={car.imageUrl}
          width={1200}
          height={800}
        />
        <div>
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl">{car.name}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge>{car.partnerLabel}</Badge>
              {car.equipmentTags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
              <p>Nájezd: {car.mileageKm} km</p>
              <p>První registrace: {car.firstRegistration}</p>
              <p>
                Výkon: {car.powerKw} kW ({car.powerHp} hp)
              </p>
              <p>Převodovka: {car.transmission}</p>
              <p>Palivo: {car.fuelType}</p>
              <p>Země: {car.locationCountry}</p>
            </div>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
              <p>Doručení: {formatPrice(car.deliveryPriceCzk)}</p>
              <p>Splátka: {formatPrice(car.monthlyPaymentCzk)}</p>
              <p className="text-xl font-semibold">
                Cena: {formatPrice(car.totalPriceCzk)}
              </p>
              <p>Bez DPH: {formatPrice(car.vatPriceCzk)}</p>
              <p className="text-green-700">{car.priceRatingLabel}</p>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

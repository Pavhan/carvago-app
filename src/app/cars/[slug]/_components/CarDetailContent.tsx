import {
  Bolt,
  Calendar,
  Cog,
  Coins,
  CreditCard,
  Fuel,
  Gauge,
  MapPin,
  Pencil,
  Receipt,
  TrendingUp,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarDetailImage } from "@/app/cars/[slug]/_components/CarDetailImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/helpers/formatPrice";
import { getCarBySlug } from "@/lib/cars";

export async function CarDetailContent({ slug }: { slug: string }) {
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-x-4 lg:grid-cols-2">
        <CarDetailImage alt={car.name} src={car.imageUrl} />
        <div>
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl" data-testid="car-title">
              {car.name}
            </CardTitle>
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
              <p className="inline-flex items-center gap-2">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                Nájezd: {car.mileageKm} km
              </p>
              <p className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                První registrace: {car.firstRegistration}
              </p>
              <p className="inline-flex items-center gap-2">
                <Bolt className="h-4 w-4 text-muted-foreground" />
                Výkon: {car.powerKw} kW ({car.powerHp} hp)
              </p>
              <p className="inline-flex items-center gap-2">
                <Cog className="h-4 w-4 text-muted-foreground" />
                Převodovka: {car.transmission}
              </p>
              <p className="inline-flex items-center gap-2">
                <Fuel className="h-4 w-4 text-muted-foreground" />
                Palivo: {car.fuelType}
              </p>
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Země: {car.locationCountry}
              </p>
            </div>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
              <div className="flex flex-col gap-3">
                <p className="inline-flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  Doručení: {formatPrice(car.deliveryPriceCzk)}
                </p>
                <p className="inline-flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  Splátka: {formatPrice(car.monthlyPaymentCzk)}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p
                  className="inline-flex items-center gap-2 text-xl font-semibold"
                  data-testid="car-price"
                >
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  Cena: {formatPrice(car.totalPriceCzk)}
                </p>
                <p className="inline-flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-muted-foreground" />
                  Bez DPH: {formatPrice(car.vatPriceCzk)}
                </p>
                <p className="inline-flex items-center gap-2 text-green-700">
                  <TrendingUp className="h-4 w-4" />
                  {car.priceRatingLabel}
                </p>
              </div>
            </div>
            <div className="pt-2">
              <Button asChild size="sm" type="button" variant="outline">
                <Link href={`/cars/${car.slug}/edit`}>
                  <Pencil className="h-4 w-4" />
                  Upravit
                </Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

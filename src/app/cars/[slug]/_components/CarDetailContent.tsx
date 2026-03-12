import { Cog, Coins, Fuel, Pencil } from "lucide-react";
import Link from "next/link";
import { CarDetailImage } from "@/app/cars/[slug]/_components/CarDetailImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Car } from "@/drizzle/schema";
import { formatPrice } from "@/helpers/formatPrice";
import { cn } from "@/lib/utils";
import { DeleteCarAlertDialog } from "./DeleteCarAlertDialog";

type CarDetailContentProps = {
  car: Car;
  variant: "detail" | "list";
  index?: number;
};

export function CarDetailContent({
  car,
  variant = "list",
  index,
}: CarDetailContentProps) {
  const isDetailVariant = variant === "detail";
  const imageLoadingType =
    variant === "list" && typeof index === "number" && index > 6
      ? "lazy"
      : "eager";

  const content = (
    <Card
      className="overflow-hidden @container  group-hover:border-primary group-hover:shadow-lg transition-colors  h-full p-4"
      data-testid={!isDetailVariant ? "car-card" : undefined}
    >
      <div className="grid gap-6 grid-cols-1 @md:grid-cols-[50%_1fr]">
        <CarDetailImage
          alt={car.name}
          loading={isDetailVariant ? "eager" : imageLoadingType}
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={car.imageUrl}
          wrapperClassName="h-64 rounded-md bg-neutral-200/80 lg:min-h-64 lg:h-full"
        />

        <div className="space-y-4 flex flex-col h-full">
          <CardHeader className="p-0">
            <CardTitle
              className={cn("text-xl", { "md:text-2xl": isDetailVariant })}
              data-testid="car-title"
            >
              {car.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 flex flex-col grow space-y-4">
            <div className="text-sm md:text-base grow space-y-4">
              <p className="flex items-center gap-2">
                <Cog className="h-4 w-4 text-muted-foreground" />
                Převodovka: {car.transmission}
              </p>
              <p className="flex items-center gap-2">
                <Fuel className="h-4 w-4 text-muted-foreground" />
                Palivo: {car.fuelType}
              </p>
            </div>

            <div className="flex justify-between gap-4 items-end">
              <p
                className={cn("flex items-center gap-2 font-semibold", {
                  "text-2xl": isDetailVariant,
                })}
                data-testid="car-price"
              >
                <Coins className="h-4 w-4 text-muted-foreground" />
                Cena: {formatPrice(car.price)}
              </p>
              {isDetailVariant ? (
                <div className="pt-2 flex items-center gap-2">
                  <Button asChild type="button" variant="outline">
                    <Link href={`/cars/${car.slug}/edit`}>
                      <Pencil className="h-4 w-4" />
                      Upravit
                    </Link>
                  </Button>

                  <DeleteCarAlertDialog
                    id={car.id}
                    slug={car.slug}
                    name={car.name}
                  />
                </div>
              ) : null}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );

  return isDetailVariant ? (
    content
  ) : (
    <Link
      href={`/cars/${car.slug}`}
      data-testid="car-detail-link"
      className="block group"
    >
      {content}
    </Link>
  );
}

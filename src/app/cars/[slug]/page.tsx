import { Suspense } from "react";
import { BackButton } from "@/components/BackButton";
import { CarDetailContent } from "./_components/CarDetailContent";
import { CarDetailSkeleton } from "./_components/CarDetailSkeleton";
import { CarUpdatedToast } from "./_components/CarUpdatedToast";

export { generateMetadata } from "./generateMetadata";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="space-y-4">
      <CarUpdatedToast />
      <BackButton href="/" />
      <Suspense fallback={<CarDetailSkeleton />}>
        <CarDetailContent slug={slug} />
      </Suspense>
    </div>
  );
}

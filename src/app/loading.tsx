import { SkeletonCarListItem } from '@/components/skeleton/SkeletonCarListItem';
import { HomePageLayout } from '@/components/layout/HomePageLayout';

export default function Loading() {
  return (
    <HomePageLayout>
      <SkeletonCarListItem />
    </HomePageLayout>
  );
}

import type { ReactNode } from 'react';

type HomePageLayoutProps = {
  children: ReactNode;
};

export default function HomePageLayout({ children }: HomePageLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">Auta</h1>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

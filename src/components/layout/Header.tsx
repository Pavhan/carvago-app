import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-white sticky py-2 shadow top-0 z-10">
      <div className="container">
        <div className="flex items-center justify-between gap-8">
          <div className="flex gap-8 items-center">
            <Link href="/" className="pt-1">
              <Image
                alt="Carvago logo"
                src="/logo-carvago.svg"
                width={136}
                height={30}
              />
            </Link>
          </div>
          <Button asChild className="primary" size="lg">
            <Link href="/cars/new">Přidat auto</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

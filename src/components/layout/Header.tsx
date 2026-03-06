import Image from 'next/image';
import Link from 'next/link';
import { MenuItem } from '@/components/layout/MenuItem';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export function Header() {
  return (
    <header className="bg-white sticky py-2 box-shadow top-0 z-10">
      <div className="container">
        <div className="flex items-center justify-between gap-8">
          <div className="flex gap-8 items-center">
            <Link href="/" className="pt-1">
              <Image
                alt="Carvago logo"
                src="https://carvago.com/_next/static/media/logo-carvago.bbdeea53.svg"
                width={136}
                height={30}
              />
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <MenuItem href="/buy">Koupit</MenuItem>
                <MenuItem href="/sell">Prodat</MenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <Button asChild className="primary">
            <Link href="/cars/new">Přidat auto</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

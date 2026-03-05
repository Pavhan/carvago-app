import Link from "next/link";
import MenuItem from "@/components/layout/MenuItem";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Header() {
  return (
    <header className="bg-white sticky py-2 box-shadow">
      <div className="container">
        <div className="flex gap-8 items-center">
          <Link href="/" className="pt-1">
            <img
              alt="Carvago logo"
              src="https://carvago.com/_next/static/media/logo-carvago.bbdeea53.svg"
            />
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <MenuItem href="/buy">Koupit</MenuItem>
              <MenuItem href="/sell">Prodat</MenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}

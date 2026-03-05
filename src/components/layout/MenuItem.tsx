"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type MenuItemProps = {
  href: string;
  children: string;
};

export default function MenuItem({ href, children }: MenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        active={isActive}
        className={cn(
          navigationMenuTriggerStyle(),
          isActive && "bg-neutral-100 text-neutral-900",
        )}
      >
        <Link href={href} aria-current={isActive ? "page" : undefined}>
          {children}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

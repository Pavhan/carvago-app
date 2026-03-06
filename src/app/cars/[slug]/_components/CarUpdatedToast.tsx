"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function CarUpdatedToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("updated") !== "1") {
      return;
    }

    toast.success("Auto bylo úspěšně aktualizováno.", {
      id: "car-updated-success",
    });
    router.replace(pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}

"use client";

import { BsGlobe } from "react-icons/bs";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LocaleToggle() {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Translation toggle
  const switchLocale = (locale: "en" | "ar") => {
    router.push(`${pathname}?${searchParams.toString()}`, { locale });
  };

  return (
    // DropDown Selector For Translation
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BsGlobe className="text-custom-rose-900" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => switchLocale("en")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale("ar")}>Arabic</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";
import { CgProfile } from "react-icons/cg";

type MenuLink = {
  href: string;
  label: string;
};

type ProfileIconProps = {
  icon?: ReactNode;
  className?: string;
  links?: MenuLink[];
  showSignOut?: boolean;
};

export default function ProfileIcon({
  icon = <CgProfile className="text-custom-rose-800 w-5 h-5" />,
  className = "",
  links = [{ href: "/profile", label: "profile" }],
  showSignOut = true,
}: ProfileIconProps) {
  // Translations
  const t = useTranslations();

  return (
    <DropdownMenu>
      {/*  Profile icon */}
      <DropdownMenuTrigger className={className}>{icon}</DropdownMenuTrigger>
      {/* Links */}
      <DropdownMenuContent>
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <DropdownMenuItem className="focus:bg-custom-rose-600 hover:cursor-pointer focus:text-white p-2">
              {t(link.label)}
            </DropdownMenuItem>
          </Link>
        ))}

        {/* Sign out */}
        {showSignOut && (
          <DropdownMenuItem>
            <Button
              onClick={() => signOut()}
              className="text-white bg-custom-rose-800 hover:bg-custom-600 w-full"
            >
              {t("sign-out")}
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import Image from "next/image";
import React from "react";
import { Link, usePathname } from "@/i18n/routing";
import {
  LuFlower,
  LuClipboardList,
  LuLayoutDashboard,
  LuCalendarHeart,
  LuPackage,
} from "react-icons/lu";
import { useTranslations } from "next-intl";

export default function NavigationSection() {
  // Translation
  const t = useTranslations();

  // Variables
  const p = usePathname();
  const navigationItems = [
    {
      icon: <LuLayoutDashboard className="w-[25px] h-[25px] mr-[10px]" />,
      label: t("overview"),
      href: "/dashboard/overview",
    },
    {
      icon: <LuClipboardList className="w-[25px] h-[25px] mr-[10px]" />,
      label: t("categories"),
      href: "/dashboard/categories",
    },
    {
      icon: <LuCalendarHeart className="w-[25px] h-[25px] mr-[10px]" />,
      label: t("occasions"),
      href: "/dashboard/occasions",
    },
    {
      icon: <LuPackage className="w-[25px] h-[25px] mr-[10px]" />,
      label: t("products"),
      href: "/dashboard/products",
    },
  ];

  return (
    <div className="w-[237px] flex justify-center items-center flex-col">
      {/* Logo */}
      <Link href="/dashboard">
        <Image src="/assets/images/logo.png" alt="rose-app-logo" width={86} height={0} />
      </Link>

      {/* Preview website */}
      <div className="w-[237px] flex flex-col gap-4 mt-[37px]">
        <Link
          href="/"
          className="bg-custom-rose-900 capitalize mb-2 text-base flex justify-center items-center p-[10px] rounded-lg font-semibold text-white"
        >
          <LuFlower className="w-[25px] h-[25px] mr-2" />
          {t("preview-website")}
        </Link>

        {/* Navigation list */}
        {navigationItems.map((i, index) => {
          const isActive =
            p === i.href || (i.href !== "/" && p.startsWith(i.href));

          return (
            <Link
              href={i.href}
              key={index}
              className={`
              text-base capitalize flex items-center p-[10px] rounded-lg font-bold
              transition duration-300
              ${
                isActive
                  ? "text-custom-rose-900 bg-custom-rose-50"
                  : "text-custom-black hover:text-custom-rose-900 hover:bg-custom-rose-50"
              }
            `}
            >
              <span
                className={`
              w-[25px] h-[25px] mr-[10px]
              ${isActive ? "text-custom-rose-900" : "text-current"}
            `}
              >
                {i.icon}
              </span>
              {i.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

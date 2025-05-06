"use client";

import Image from "next/image";
import React from "react";
import { Link } from "@/i18n/routing";
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
  const navigationItems = [
    { icon: <LuLayoutDashboard />, label: t('overview'), href: "/" },
    { icon: <LuClipboardList />, label: t('categories'), href: "/" },
    { icon: <LuCalendarHeart />, label: t('occasions'), href: "/" },
    { icon: <LuPackage />, label: t('products'), href: "/" },
  ];

  return (
    <div className="w-[237px] flex justify-center items-center flex-col">
      {/* Logo */}
      <Image src="/assets/images/logo.png" alt="rose-app-logo" width={86} height={0} />

      {/* Navigation */}
      <div className="w-[237px] flex flex-col gap-4 mt-[37px]">
        <Link
          href="/"
          className="bg-custom-rose-900 capitalize mb-2 text-base flex justify-center items-center p-[10px] rounded-lg font-semibold text-white"
        >
          <LuFlower className="w-[25px] h-[25px] mr-2" />
          {t('preview-website')}
        </Link>

        {navigationItems.map((item, index) => (
          <Link
            href={item.href} // Use dynamic href
            key={index}
            className="text-base flex items-center p-[10px] rounded-lg font-bold text-custom-black hover:text-custom-rose-900 hover:bg-custom-rose-50 transition duration-300"
          >
            {item.icon} {/* Use dynamic icon */}
            {item.label} {/* Use dynamic label */}
          </Link>
        ))}

        {/* <Link
          href="/"
          className="text-base flex items-center p-[10px] rounded-lg font-bold text-custom-black hover:text-custom-rose-900 hover:bg-custom-rose-50 transition duration-300"
        >
          <LuLayoutDashboard className="w-[25px] h-[25px] mr-[10px]" />
          Overview
        </Link>
        <Link
          href="/"
          className="text-base flex items-center p-[10px] rounded-lg font-bold text-custom-black hover:text-custom-rose-900 hover:bg-custom-rose-50 transition duration-300"
        >
          <LuClipboardList className="w-[25px] h-[25px] mr-[10px]" />
          Categories
        </Link>
        <Link
          href="/"
          className="text-base flex items-center p-[10px] rounded-lg font-bold text-custom-black hover:text-custom-rose-900 hover:bg-custom-rose-50 transition duration-300"
        >
          <LuCalendarHeart className="w-[25px] h-[25px] mr-[10px]" />
          Occasions
        </Link>
        <Link
          href="/"
          className="text-base flex items-center p-[10px] rounded-lg font-bold text-custom-black hover:text-custom-rose-900 hover:bg-custom-rose-50 transition duration-300"
        >
          <LuPackage className="w-[25px] h-[25px] mr-[10px]" />
          Products
        </Link> */}
      </div>
    </div>
  );
}

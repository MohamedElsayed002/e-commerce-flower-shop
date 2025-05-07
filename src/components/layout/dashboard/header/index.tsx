"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "@/i18n/routing";
import { NAVIGATION_LINKS } from "@/lib/constants/navigation-links.constant";
import Link from "next/link";
import React from "react";

export default function Header() {
  // Variables
  const pathname = usePathname();
  const activeLink = NAVIGATION_LINKS.find((link) => pathname === link.href);

  return (
    <div className="h-[70px] border-b border-black/8 flex items-center px-4">
      {/* Breadcrumb component */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {/* First child */}
            <BreadcrumbLink asChild>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {/* Active link */}
          {activeLink && (
            <BreadcrumbItem>
              <BreadcrumbPage className="text-custom-rose-900 capitalize">
                {activeLink.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

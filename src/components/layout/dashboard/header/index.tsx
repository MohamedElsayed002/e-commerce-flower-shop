"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";

export default function Header() {
  // Translations
  const t = useTranslations();

  // Hooks
  const p = usePathname();

  // Variables
  const cleanPath = p.replace(/^\/[a-z]{2}\/dashboard/, "");
  const segments = cleanPath.split("/").filter(Boolean);

  // Functions
  const breadcrumbs = segments.map((segment, index) => {
    const path = `/dashboard/${segments.slice(0, index + 1).join("/")}`;
    const labelMap: Record<string, string> = {
      overview: t("overview"),
      categories: t("categories"),
      "categories/add": t('add-category'),
      occasions: t("occasions"),
      "occasions/add": t('add-occasion'),
      products: t("products"),
      "products/add": t('add-product'),
    };

    return {
      href: path,
      label: labelMap[segments.slice(0, index + 1).join("/")] || segment.replace(/-/g, " "),
      isLast: index === segments.length - 1,
    };
  });

  return (
    <div className="h-16 border-b border-black/8 flex items-center px-4">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Dashboard root */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                {t("dashboard")}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Show breadcrumbs only if not on dashboard root */}
          {breadcrumbs.length > 0 && <BreadcrumbSeparator />}

          {breadcrumbs.map((crumb, index) => (
            <Fragment key={crumb.href}>
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage className="text-custom-rose-900 capitalize">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={crumb.href}
                      className="text-gray-600 hover:text-gray-900 capitalize"
                    >
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

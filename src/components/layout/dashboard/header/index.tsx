/* eslint-disable @typescript-eslint/no-unused-vars */
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

// types/breadcrumb.ts
export interface BreadcrumbItem {
  title: string; // The translated title to display
  href: string; // The path to navigate to
  isTranslated?: boolean; // Whether the title is already translated
}

interface HeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
}

export default function Header({ breadcrumbs = [], title }: HeaderProps) {
  // Translations
  const t = useTranslations();

  // Hooks
  const p = usePathname();

  // Variables
  const cleanPath = p.replace(/^\/[a-z]{2}\/dashboard/, "");
  const segments = cleanPath.split("/").filter(Boolean);

  // Functions
  // const breadcrumbs = segments.map((segment, index) => {
  //   const path = `/dashboard/${segments.slice(0, index + 1).join("/")}`;
  //   const labelMap: Record<string, string> = {
  //     overview: t("overview"),
  //     categories: t("categories"),
  //     "categories/add": t('add-category'),
  //     "categories/update": t('update-category'),
  //     occasions: t("occasions"),
  //     "occasions/add": t('add-occasion'),
  //     "occasions/update": t('update-occasion'),
  //     products: t("products"),
  //     "products/add": t('add-product'),
  //     "products/update": t('update-product'),
  //   };

  //   return {
  //     href: path,
  //     label: labelMap[segments.slice(0, index + 1).join("/")] || segment.replace(/-/g, " "),
  //     isLast: index === segments.length - 1,
  //   };
  // });

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {title && <h1 className="text-lg font-semibold">{title}</h1>}

      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const shouldHighlight = breadcrumbs.length > 1 && isLast;
            const label = crumb.isTranslated ? crumb.title : t(crumb.title);

            return (
              <Fragment key={crumb.href}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className={shouldHighlight ? "text-primary font-medium" : ""}>
                      {label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href} className="hover:text-primary">
                        {label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

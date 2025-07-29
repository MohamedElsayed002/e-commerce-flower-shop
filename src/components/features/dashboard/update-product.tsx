"use client";

import Header from "@/components/layout/dashboard/header";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function UpdateProduct() {
  // NOTE: This is just for testing breadcrumbs.
  const t = useTranslations();
  const searchParams = useSearchParams();
  const productName = searchParams.get("productName");

  const breadcrumbPaths = [
    { title: "dashboard", href: "/dashboard" },
    { title: "products", href: "/dashboard/products" },
    { title: `${t("update-product")}: ${productName}`, href: "" },
  ];

  return (
    <>
      <Header paths={breadcrumbPaths} />
      <div className="bg-custom-white px-4 py-7">Update Product</div>
    </>
  );
}

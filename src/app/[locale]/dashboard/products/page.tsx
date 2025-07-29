import AllEntities from "@/components/features/dashboard/all-entities";
import Header from "@/components/layout/dashboard/header";
import { fetchProducts } from "@/lib/apis/product.api";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  // Translations
  const t = await getTranslations();

  // Variables
  const payload = await fetchProducts(searchParams);
  const tableHeader = [t("name"), t("price"), t("stock"), t("sales"), t("rating"), ""];
  const breadcrumbPaths = [
    { title: "dashboard", href: "/dashboard" },
    { title: "products", href: "/dashboard/products" },
  ];

  return (
    <>
      <Header paths={breadcrumbPaths} />

      <div className="bg-custom-white px-4 py-7">
        <AllEntities data={payload.products} tableHeader={tableHeader} />
      </div>
    </>
  );
}

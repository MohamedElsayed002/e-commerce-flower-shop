import AllEntities from "@/components/features/dashboard/all-entities";
import { fetchProducts } from "@/lib/apis/product.api";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  // Translations
  const t = await getTranslations();

// Variables
  const payload = await fetchProducts(searchParams);
  const tableHeader = [t('name'), t('price'), t('stock'), t('sales'), t('rating'), ''];

  return (
    <>
      <AllEntities data={payload.products} tableHeader={tableHeader} />
    </>
  );
}

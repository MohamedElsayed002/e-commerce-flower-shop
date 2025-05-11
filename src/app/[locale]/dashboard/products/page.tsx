import AllEntities from "@/components/features/dashboard/all-entities";
import { fetchProducts } from "@/lib/apis/product.api";
import React from "react";

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
// Variables
  const payload = await fetchProducts(searchParams);
  const tableHeader = ['name', 'price', 'stock', 'sales', 'rating', ''];

  return (
    <>
      <AllEntities data={payload.products} tableHeader={tableHeader} />
    </>
  );
}

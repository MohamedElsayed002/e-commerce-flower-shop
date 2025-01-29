import React from "react";
import Categories from "./_component/categories";
import { fetchCategories } from "@/lib/apis/category.api";

export default async function Page() {
  const data = await fetchCategories();

  return (
    <>
      <Categories data={data} />
    </>
  );
}

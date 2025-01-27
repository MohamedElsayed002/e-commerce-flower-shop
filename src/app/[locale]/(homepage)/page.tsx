import React from "react";
import Categories from "./_component/categories";
import { categoriesWrapper } from "@/lib/apis/category.api";

export default async function Page() {
  const data = await categoriesWrapper();

  return (
    <>
      <Categories data={data} />
    </>
  );
}

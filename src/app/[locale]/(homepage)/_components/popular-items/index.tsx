/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getTranslations } from "next-intl/server";
import PopularItemsTabs from "./components/popular-items-tabs";
import PopularItemsGrid from "./components/popular-items-grid";

export default async function PopularItems({ searchParams }: { searchParams: SearchParams }) {
  // Translation
  const t = await getTranslations();

  const response = await fetch(`${process.env.NEXT_BASE_URL}/categories`);
  const data = await response.json();

  // Map the fetched categories data to a simplified format
  const categories: Category[] = data.categories.map((category: any) => ({
    id: category._id,
    name: category.name,
  }));

  // Determine the selected category from search parameters or default to the first category
  const selectedCategory = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category || categories[0]?.id;

  return (
    <div className="mb-20">
      {/* Section header */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          {/* Section title */}
          <h3 className="text-custom-blue-gray-600 font-bold text-[30px] z-10 font-inter">
            {t("popular-items")}
          </h3>

          {/* Underline decoration */}
          <div className="bg-custom-rose-900 w-[53px] h-[2px] z-10"></div>
          <div
            className="bg-main-color w-[136px] h-[17px] absolute bottom-0 -z-10 
            rounded-e-full rtl:rounded-s-none"
          ></div>
        </div>

        {/* Tabs for categories */}
        <PopularItemsTabs tabsData={categories} />
      </div>

      {/* Grid to display items in the selected category */}
      <PopularItemsGrid categoryId={selectedCategory} />
    </div>
  );
}

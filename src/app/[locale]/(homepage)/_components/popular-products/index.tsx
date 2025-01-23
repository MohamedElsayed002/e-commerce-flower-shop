"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import PopularProductsGrid from "./components/popular-products-grid";

export default function PopularProductsComponent() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<number>(0);

  // Tabs with categoryIDs and labels for filtering products
  const tabs = [
    {
      id: 0,
      label: t("home-and-living"),
      categoryId: "673c46fd1159920171827c85",
    },
    {
      id: 1,
      label: t("garment-care"),
      categoryId: "673c47751159920171827c93",
    },
    {
      id: 2,
      label: t("gifts-box"),
      categoryId: "673c472f1159920171827c8a",
    },
    {
      id: 3,
      label: t("occasion-gifts"),
      categoryId: "673c479e1159920171827c99",
    },
  ];

  return (
    <div className="mb-20 w-[1280px]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div className="relative">
          <h3 className="text-custom-blue-gray-600 font-bold text-[30px] z-10 font-inter">
            {t("popular-products")}
          </h3>
          <div className="bg-custom-light-rose-900 w-[53px] h-[2px] z-10"></div>
          <div
            className="bg-custom-light-rose-50 w-[136px] h-[17px] absolute bottom-0 -z-10 
            rounded-e-full rtl:rounded-s-none"
          ></div>
        </div>
        {/* Tabs for Category Selection */}
        <div className="tabs">
          <ul className="list-none flex gap-6 text-xl font-normal text-custom-blue-gray-600 font-inter">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer transition-all rounded-md ${
                  activeTab === tab.id
                    ? "text-custom-light-rose-900 underline underline-offset-[10%] decoration-2"
                    : "hover:text-custom-light-rose-900"
                }`}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Products Grid */}
      <PopularProductsGrid tab={tabs[activeTab]} />
    </div>
  );
}

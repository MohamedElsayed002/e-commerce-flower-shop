"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Props for the PopularItemsTabs component
type PopularItemsTabsProps = {
  tabsData: Category[];
};

export default function PopularItemsTabs({ tabsData }: PopularItemsTabsProps) {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState(0);

  // Navigation
  const router = useRouter();

  // Get the current search parameters
  const searchParams = useSearchParams();

  /**
   * Handles tab click events.
   * Updates the active tab index and appends the selected category ID to the query string.
   *
   * @param index - The index of the selected tab
   * @param categoryId - The ID of the selected category
   */
  const handleTabClick = (index: number, categoryId: string) => {
    // Update the active tab state
    setActiveTab(index);

    // Get the current URL query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Set the "category" parameter to the selected category ID
    params.set("category", categoryId);

    // Update the URL with the new query string
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="categories">
      {/* Render the list of category tabs */}
      <ul className="list-none flex gap-6 text-xl font-normal text-blue-gray-900 font-inter">
        {tabsData.slice(0, 4).map((tab: Category, index: number) => (
          // Category tab
          <li
            key={index}
            onClick={() => handleTabClick(index, tab._id)}
            className={`cursor-pointer transition-all rounded-md text-blue-gray-900 capitalize ${
              activeTab === index
                ? "text-custom-rose-900 underline underline-offset-[10%] decoration-2"
                : "hover:text-custom-rose-900"
            }`}
          >
            {/* Category name */}
            {tab.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

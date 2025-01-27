/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Props for the PopularItemsTabs component
type PopularItemsTabsProps = {
  tabsData: Category[];
};

export default function PopularItemsTabs({ tabsData }: PopularItemsTabsProps) {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState(0);

  // Navigation
  const router = useRouter();

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
    const params = new URLSearchParams(window.location.search);

    // Set the "category" parameter to the selected category ID
    params.set("category", categoryId);

    // Update the URL with the new query string
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="categories">
      {/* Render the list of category tabs */}
      <ul className="list-none flex gap-6 text-xl font-normal text-blue-gray-900 font-inter">
        {tabsData.map((tab: any, index: number) => (
          <li
            key={index}
            onClick={() => handleTabClick(index, tab.id)}
            className={`cursor-pointer transition-all rounded-md text-blue-gray-900 capitalize ${
              activeTab === index
                ? "text-custom-rose-900 underline underline-offset-[10%] decoration-2"
                : "hover:text-custom-rose-900"
            }`}
          >
            {/* Display the name of the category */}
            {tab.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

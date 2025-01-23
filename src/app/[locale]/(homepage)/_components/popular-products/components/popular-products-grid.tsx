"use client";

import ErrorComponent from "@/components/common/error-component";
import LoadingComponent from "@/components/common/loading-component";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React from "react";
import PopularProducts from "./popular-products";

type Tab = {
  id: number;
  label: string;
  categoryId: string;
};

type PopularProductsGridProps = {
  tab: Tab;
};

export default function PopularProductsGrid({ tab }: PopularProductsGridProps) {
  const t = useTranslations();

  // Fetch products for the currently active tab
  const {
    isLoading,
    error,
    data: payload,
  } = useQuery({
    queryKey: ["products", tab?.categoryId, "-sold"],
    queryFn: async () => {
      const response = await fetch(
        `/api/filtered-products?category=${tab?.categoryId}&sort=-sold`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch best-seller products");
      }
      const payload = await response.json();
      return payload.sort(
        (a: { sold: number }, b: { sold: number }) => b.sold - a.sold
      );
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (error instanceof Error) return <ErrorComponent />;

  return (
    <div className="grid grid-cols-4 gap-6">
      {isLoading ? (
        <LoadingComponent />
      ) : payload?.length === 0 ? (
        <div className="col-span-4 text-center text-xl font-semibold text-custom-blue-gray-600">
          {t("no-products-here")}
        </div>
      ) : (
        payload?.map((product: Product, index: number) => (
          <PopularProducts key={index} product={product} />
        ))
      )}
    </div>
  );
}

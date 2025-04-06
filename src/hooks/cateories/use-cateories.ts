"use client";

import { useQuery } from "@tanstack/react-query";

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const url = new URL(process.env.API + "/products");
      if (category) {
        url.searchParams.append("category", category);
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
    // You can add more options here like:
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // enabled: !!category, // only fetch when category exists
  });
};

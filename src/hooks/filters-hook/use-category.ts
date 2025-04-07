"use client";

import { useQuery } from "@tanstack/react-query";

// Hook to fetch products by category
export function useProductsByCategory(category?: string) {
  // Fetch products
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const url = new URL(process.env.API + "/products");
      if (category) {
        url.searchParams.append("category", category);
      }
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });
}

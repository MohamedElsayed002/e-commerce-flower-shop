"use client";

import { fetchCategories } from "@/lib/apis/category.api";
import { useQuery } from "@tanstack/react-query";

// Hook to fetch products by category
export function useProductsByCategory(category?: string) {
  // Fetch products
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchCategories(category),
  });
}

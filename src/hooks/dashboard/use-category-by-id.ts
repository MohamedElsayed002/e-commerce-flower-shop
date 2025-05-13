"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "@/lib/apis/dashboard/category.api";
export function useCategoryById(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
}

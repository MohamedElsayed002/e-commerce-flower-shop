"use client";

import { useQuery } from "@tanstack/react-query";

export function useOccaison(occasion?: string) {
  return useQuery({
    queryKey: ["products", occasion],
    queryFn: async () => {
      const url = new URL(process.env.API + "/products");
      if (occasion) {
        url.searchParams.append("occasion", occasion);
      }
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });
}

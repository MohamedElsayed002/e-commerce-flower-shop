// "use client";

// import { useQuery } from "@tanstack/react-query";

// export function useProducts(occasion?: string) {
//   return useQuery({
//     queryKey: ["products", occasion],
//     queryFn: async () => {
//       const url = new URL(process.env.API + "/products");
//       if (occasion) {
//         url.searchParams.append("occasion", occasion);
//       }
//       const res = await fetch(url.toString());
//       if (!res.ok) throw new Error("Failed to fetch products");
//       return res.json();
//     },
//   });
// }
// hooks/filters-hook/use-occasions.ts
"use client";

import { fetchOccasions } from "@/lib/apis/occasion-api";
import { useQuery } from "@tanstack/react-query";

export function useOccasions() {
  return useQuery({
    queryKey: ["occasions"],
    queryFn: () => fetchOccasions(),
  });
}

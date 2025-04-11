"use client";

import { fetchOccasions } from "@/lib/apis/occasion-api";
import { useQuery } from "@tanstack/react-query";

// UseQuery hook
export function useOccasions() {
  return useQuery({
    queryKey: ["occasions"],
    queryFn: () => fetchOccasions(),
  });
}

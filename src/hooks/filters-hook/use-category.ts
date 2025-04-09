"use client"

import { fetchProducts } from "@/lib/apis/product.api";
import { useQuery } from "@tanstack/react-query";

export function useProductCategory({rating,status}:{rating:string,status:string | string[]}) {
    // Fetch Products
    return useQuery({
        queryKey: ["products",rating,status],
        queryFn: () => fetchProducts({rating, status: Array.isArray(status) ? status : [status]})
    })
}
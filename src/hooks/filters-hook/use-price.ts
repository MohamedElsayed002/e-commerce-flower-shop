"use client";

import { useQuery } from "@tanstack/react-query";

// Types
type ProductApiResponse = {
  products: Product[];
};

// Fetching products from the API
const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://flower.elevateegy.com/api/v1/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  const json: ProductApiResponse = await res.json();
  return json.products;
};

// Fetch maximum price
export function useMaxPriceFromProducts() {
  return useQuery<number>({
    queryKey: ["maxPriceFromProducts"],
    queryFn: async () => {
      const products = await fetchProducts();
      const max = products.reduce((max: number, product: Product) => {
        const price = Number(product.price);
        return price > max ? price : max;
      }, 0);
      return max;
    },
  });
}

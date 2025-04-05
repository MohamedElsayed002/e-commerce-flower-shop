"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

// Types
type ProductPrice = Pick<Product, "price">;

const priceFilterSchema = z.object({
  priceRange: z
    .tuple([z.number().nonnegative(), z.number().nonnegative()])
    .refine(([min, max]) => min <= max, {
      message: "Min price must be less than or equal to max",
    }),
});

// Type for price filter
type PriceFilterFormType = z.infer<typeof priceFilterSchema>;

//  Fetch products from API
const fetchProducts = async (): Promise<ProductPrice[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products`);
  // Check response
  if (!res.ok) throw new Error("Failed to fetch products");
  const json = await res.json();
  const prices = (json.products as Product[]).map((p: Product) => p.price || 0);
  //   console.log(" Prices:", prices);
  return json.products;
};

// Fetch products and the maximum price
function useMaxPriceFromProducts() {
  return useQuery<number>({
    queryKey: ["maxPriceFromProducts"],
    queryFn: async () => {
      const products = await fetchProducts();
      //   Get the maximum price
      return products.reduce((max: number, product: Product) => {
        const price = Number(product.price) || 0;
        return price > max ? price : max;
      }, 0);
    },
  });
}
export default function PriceFilter() {
  // Translation
  const t = useTranslations();

  // Params
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetching max price
  const { data: apiMax, isLoading } = useMaxPriceFromProducts();

  // Get the maximum price from the API or set a default value
  const maxPrice = apiMax ?? 10000;

  // Get initial min and max price
  const initialMin = Number(searchParams.get("price[gte]")) || 0;
  const initialMax = Number(searchParams.get("price[lte]")) || maxPrice;

  // Fetching products
  const { watch, setValue } = useForm<PriceFilterFormType>({
    // Validation
    resolver: zodResolver(priceFilterSchema),
    defaultValues: {
      priceRange: [initialMin, initialMax],
    },
  });

  // Watch the price range value
  const priceRange = watch("priceRange");

  // Fetching products
  const debouncedReplace = useDebouncedCallback((range: [number, number]) => {
    // Update the URL
    const [min, max] = range;
    const params = new URLSearchParams(searchParams.toString());
    // Set the price range in the URL
    params.set("price[gte]", String(min));
    params.set("price[lte]", String(max));

    // push the new URL
    router.replace(`?${params.toString()}`);
  }, 300);

  // Handle slider change event
  const handleSliderChange = (value: number[]) => {
    const tupleValue = value as [number, number];
    setValue("priceRange", tupleValue, { shouldValidate: true });
    debouncedReplace(tupleValue);
  };

  return (
    <Card className="w-[302px] p-6 rounded-[20px] bg-white shadow-lg space-y-4 rtl:space-x-reverse">
      {/*  Title */}
      <h3 className="cupitalize font-bold text-blue-gray-900 leading-[44px] border-b pb-3 last:border-b-2 rtl:text-right">
        {t("price_rating")}
      </h3>

      {/* Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-16">
          <Loader2 className="animate-spin w-6 h-6 text-pink-500" />
        </div>
      ) : (
        <>
          {/* Price range display and slider */}
          <div className="flex  text-sm text-custom-rose-900 font-bold rtl:flex-row-reverse">
            {/* Display min and max  */}
            <span className="me-1">${priceRange[0].toFixed(2)}</span>
            {"-"}
            <span className="ms-1">${priceRange[1].toFixed(2)}</span>
          </div>

          {/* Slider  */}
          <Slider
            className="w-[254px] h-[46.16px] text-custom-rose-900 rtl:direction-ltr"
            min={0}
            max={maxPrice}
            step={1}
            value={priceRange}
            onValueChange={handleSliderChange}
          />
        </>
      )}
    </Card>
  );
}

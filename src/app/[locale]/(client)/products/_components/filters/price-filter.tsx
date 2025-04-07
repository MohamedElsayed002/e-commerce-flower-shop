"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { useMaxPriceFromProducts } from "@/hooks/filters-hook/use-price";

export default function PriceFilter() {
  // Translations
  const t = useTranslations();

  // Router
  const router = useRouter();

  // Params
  const searchParams = useSearchParams();

  // Validation schema
  const priceFilterSchema = z.object({
    priceRange: z
      .tuple([z.number().nonnegative(), z.number().nonnegative()])
      .refine(([min, max]) => min <= max, {
        message: t("price_range_error"),
      }),
  });

  // Type for form data
  type PriceFilterFormType = z.infer<typeof priceFilterSchema>;

  // Fetch max price from API
  const { data: apiMax, isLoading, isError } = useMaxPriceFromProducts();
  const maxPrice = apiMax && !isError ? apiMax : 10000;

  // Get initial values from URL
  const initialMin = Number(searchParams.get("price[gte]")) || 0;
  const initialMax = Number(searchParams.get("price[lte]")) || maxPrice;

  // Init form
  const { watch, setValue } = useForm<PriceFilterFormType>({
    resolver: zodResolver(priceFilterSchema),
    defaultValues: {
      priceRange: [initialMin, initialMax],
    },
  });

  // Watch the price range value
  const priceRange = watch("priceRange");

  // Update URL on change (debounced)
  const debouncedReplace = useDebouncedCallback((range: [number, number]) => {
    const [min, max] = range;
    const params = new URLSearchParams(searchParams.toString());
    params.set("price[gte]", String(min));
    params.set("price[lte]", String(max));
    // Update the URL
    router.replace(`?${params.toString()}`);
  }, 300);

  // On slider change
  const handleSliderChange = (value: number[]) => {
    const tupleValue = value as [number, number];
    setValue("priceRange", tupleValue, { shouldValidate: true });
    debouncedReplace(tupleValue);
  };

  return (
    <Card className="w-[302px] p-6 rounded-[20px] bg-white shadow-lg space-y-4 rtl:space-x-reverse">
      {/* Title */}
      <h3 className="font-bold text-blue-gray-900 leading-[44px] border-b pb-3 last:border-b-0 cupitalize rtl:text-right">
        {t("price_rating")}
      </h3>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center h-16">
          <Loader2 className="animate-spin w-6 h-6 text-custom-rose-700" />
        </div>
      ) : (
        <>
          {/* Price range */}
          <div className="flex text-sm text-custom-rose-900 font-bold rtl:flex-row-reverse">
            <span className="me-1">${priceRange[0].toFixed(2)}</span>-
            <span className="ms-1">${priceRange[1].toFixed(2)}</span>
          </div>

          {/* Slider */}
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

"use client";

import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useProductsByCategory } from "@/hooks/filters-hook/use-category";

// Types
type CategoryFilterProps = {
  categories: Category[];
};

// Schema
const schema = z.object({
  category: z.string().optional(),
});

// Type for form data
type FormData = z.infer<typeof schema>;

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  // Translation
  const t = useTranslations();

  // Router
  const router = useRouter();

  // Params
  const searchParams = useSearchParams();

  // Get the initial
  const initialCategory = searchParams.get("category") || "";

  // Validation
  const { setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { category: initialCategory },
  });

  // Watch the category value
  const category = watch("category");

  // Handle loading
  const { isLoading } = useProductsByCategory(category);

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setValue("category", value);
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    // Update  URL
    router.replace(`?${params.toString()}`);
  };

  return (
    <Card className="w-[302px] p-6 rounded-[20px] bg-white shadow-lg space-y-4 rtl:space-x-reverse">
      {/*Titel */}
      <h3 className="capitalize font-bold text-blue-gray-900 leading-[44px] border-b pb-3 last:border-b-0 rtl:text-right">
        {t("category")}
      </h3>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center h-16">
          <Loader2 className="animate-spin w-6 h-6 text-custom-rose-700" />
        </div>
      ) : (
        // Radio
        <RadioGroup
          className="text-custom-rose-900"
          value={category || ""}
          onValueChange={handleCategoryChange}
        >
          <div className="space-y-3">
            {/* Map categories */}
            {categories.map((cat) => (
              <div key={cat._id} className="flex items-center justify-between w-full pb-3">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {/* Radio button */}
                  <RadioGroupItem value={cat._id} id={`category-${cat._id}`} />

                  {/* Label */}
                  <Label
                    htmlFor={`category-${cat._id}`}
                    className="text-blue-gray-500 leading-5 text-sm font-inter rtl:text-right"
                  >
                    {cat.name}
                  </Label>
                </div>
                <span className="text-blue-gray-500">({cat.productsCount})</span>
              </div>
            ))}
          </div>
        </RadioGroup>
      )}
    </Card>
  );
}

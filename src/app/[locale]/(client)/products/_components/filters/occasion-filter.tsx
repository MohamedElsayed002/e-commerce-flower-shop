"use client";

import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { useProducts } from "@/hooks/filters-hook/use-occaisan";
import { Loader2 } from "lucide-react";

// Types
type OccasionFilterProps = {
  occasions: Occasion[];
};

// Schema
const schema = z.object({
  occasion: z.string().optional(),
});

// Type for form data
type FormData = z.infer<typeof schema>;

export default function OccasionFilter({ occasions }: OccasionFilterProps) {
  // Translation
  const t = useTranslations();

  // Router
  const router = useRouter();

  // Params
  const searchParams = useSearchParams();

  // Get the initial occasion
  const initialOccasion = searchParams.get("occasion") || "";

  // Validation
  const { setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { occasion: initialOccasion },
  });

  // Watch the occasion value
  const occasion = watch("occasion");

  // Handle loading or error
  const { isLoading } = useProducts(occasion);

  const handleOccasionChange = (value: string) => {
    setValue("occasion", value);
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("occasion", value);
    } else {
      params.delete("occasion");
    }
    // Update the URL
    router.replace(`?${params.toString()}`);
  };

  return (
    <Card className="w-[302px] p-6 rounded-[20px] bg-white shadow-lg space-y-4 rtl:space-x-reverse">
      {/* Title */}
      <h3 className="font-bold text-blue-gray-900 leading-[44px] border-b pb-3 last:border-b-0 capitalize rtl:text-right">
        {t("occasion")}
      </h3>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center h-16">
          <Loader2 className="animate-spin w-6 h-6 text-custom-rose-700" />
        </div>
      ) : (
        // Radio
        <RadioGroup
          className=" text-custom-rose-900 "
          value={occasion || ""}
          onValueChange={handleOccasionChange}
        >
          {/* Map occasions */}
          {occasions.map((occ) => (
            <div key={occ._id} className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {/* Radio button */}
                <RadioGroupItem value={occ._id} id={`occasion-${occ._id}`} />

                {/* Label */}
                <Label
                  htmlFor={`occasion-${occ._id}`}
                  className="text-blue-gray-500 leading-5 text-sm font-inter rtl:text-right"
                >
                  {occ.name}
                </Label>
              </div>

              {/* Count */}
              <span className="text-blue-gray-500">({occ.productsCount})</span>
            </div>
          ))}
        </RadioGroup>
      )}
    </Card>
  );
}

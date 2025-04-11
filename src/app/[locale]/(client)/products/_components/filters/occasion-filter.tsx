"use client";

import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { usePathname, useRouter } from "@/i18n/routing";

// Types
type OccasionFilterProps = {
  occasions: Occasion[];
};

// Schema
const schema = z.object({
  occasion: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function OccasionFilter({ occasions }: OccasionFilterProps) {
  // Translation
  const t = useTranslations();

  // Variables
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get the initial occasion
  const initialOccasion = searchParams.get("occasion") || "";

  // Validation
  const { setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { occasion: initialOccasion },
  });

  // Watch the occasion value
  const occasion = watch("occasion");

  // Handle occasion change
  const handleOccasionChange = (value: string) => {
    setValue("occasion", value);
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("occasion", value);
    } else {
      params.delete("occasion");
    }
    // Update the URL
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Card className="w-[302px] p-6 rounded-[20px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.05)] space-y-4 rtl:space-x-reverse">
      {/* Title */}
      <h3 className="font-bold text-blue-gray-900 leading-[44px] border-b pb-3 last:border-b-0 capitalize rtl:text-right">
        {t("occasion")}
      </h3>

      {/* Radio */}
      <RadioGroup
        className=" text-custom-rose-900 "
        value={occasion || ""}
        onValueChange={handleOccasionChange}
      >
        {/* Map occasions */}
        {occasions.map((occ) => (
          <div key={occ._id} className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 rtl:space-x-reverse w-full">
              {/* Radio button */}
              <RadioGroupItem value={occ._id} id={`occasion-${occ._id}`} />

              {/* Label */}
              <Label
                htmlFor={`occasion-${occ._id}`}
                className="text-blue-gray-500 leading-5 text-sm font-inter rtl:text-right flex-1 capitalize"
              >
                {occ.name}
              </Label>
            </div>

            {/* Count Product*/}
            <span className="text-blue-gray-500">({occ.productsCount})</span>
          </div>
        ))}
      </RadioGroup>
    </Card>
  );
}

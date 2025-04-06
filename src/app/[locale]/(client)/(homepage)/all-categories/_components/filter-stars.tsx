"use client";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function FilterStars() {
  // Translation
  const t = useTranslations();

  // Router and SearchParams
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [selected, setSelected] = useState<string | null>(searchParams.get("rating") || null);

  // Function
  const handleChange = (id: string) => {
    const newRating = id === selected ? null : id; // Check if existing rating
    setSelected(newRating);

    // Update the URL query parameters
    const params = new URLSearchParams(window.location.search);

    if (newRating) {
      params.set("rating", newRating);
    } else {
      params.delete("rating");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-2 p-5 rounded-md shadow-md">
      {/* Title */}
      <h1>{t("rating")}</h1>
      <Separator className="bg-black mt-2" />
      <div className="flex gap-y-3 mt-3 flex-col">
        {/* Rating numbers array to show */}
        <RadioGroup
          className="text-custom-900"
          value={selected || ""}
          onValueChange={handleChange}
        >
          {["5", "4", "3", "2", "1"].map((id, index) => (
            <div className="flex items-center justify-between w-full" key={index}>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value={id} id={id} />
                <Label
                  htmlFor={id}
                  className="text-blue-gray-500 leading-5 text-sm font-inter rtl:text-right"
                >
                  {id}
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

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

  // Router
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const initial = searchParams.get("rateAvg[gte]");
  const [selected, setSelected] = useState<string | null>(initial);

  // Function
  const handleChange = (value: string) => {
    const newValue = selected === value ? null : value;
    setSelected(newValue);

    const params = new URLSearchParams(window.location.search);

    if (newValue) {
      params.set("rateAvg[gte]", newValue);
    } else {
      params.delete("rateAvg[gte]");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-2 p-5 rounded-md shadow-md">
      {/* Title */}
      <h1>{t("rating")}</h1>
      <Separator className="bg-black mt-2" />

      {/* Radio Button */}
      <RadioGroup
        className="flex flex-col gap-y-3 mt-3"
        value={selected || ""}
        onValueChange={handleChange}
      >
        {/* Stars */}
        {["5", "4", "3", "2", "1"].map((id) => (
          <div
            key={id}
            onClick={() => handleChange(id)}
            className="flex items-center justify-between w-full cursor-pointer"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value={id} id={id} checked={selected === id} />
              <Label
                htmlFor={id}
                className="text-blue-gray-500 leading-5 text-xl font-inter rtl:text-right flex space-x-0.5"
              >
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < Number(id) ? "text-custom-rose-900" : "text-gray-300"}
                  >
                    {i < Number(id) ? "★" : "☆"}
                  </span>
                ))}
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

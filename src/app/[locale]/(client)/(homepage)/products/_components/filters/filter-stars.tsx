"use client";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ratings = ["5", "4", "3", "2", "1"];

export function FilterStars() {
  // Translation
  const t = useTranslations();

  // Router
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()

  // State
  const [selected, setSelected] = useState<string | null>(searchParams.get("rateAvg[gte]"));

  // Function
  const handleChange = (value: string) => {
    const params = new URLSearchParams(pathname);

    if (value === "all") {
      params.delete("rateAvg[gte]");
    } else {
      params.set("rateAvg[gte]", value);
    }

    setSelected(value);
    console.log(params.toString())
    router.push(`?${params.toString()}`);
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
        {ratings.map((id) => (
          <div key={id} className="flex items-center justify-between w-full cursor-pointer">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem
                onClick={() => handleChange(id)}
                value={id}
                id={id}
                checked={selected === id}
              />
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
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <RadioGroupItem
            onClick={() => handleChange("all")}
            value={"all"}
            id={"all"}
            checked={selected === "all"}
          />
          <Label
            htmlFor={"all"}
            className="text-blue-gray-500 leading-5 text-xl font-inter rtl:text-right flex space-x-0.5"
          >
            {t('all-products')}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

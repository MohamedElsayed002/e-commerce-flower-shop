"use client";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";

type OccasionFilterProps = {
  occasions: Occasion[];
};

const schema = z.object({
  occasion: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function OccasionFilter({ occasions }: OccasionFilterProps) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialOccasion = searchParams.get("occasion") || "";

  const { setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { occasion: initialOccasion },
  });

  const occasion = watch("occasion");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", occasion],
    queryFn: async () => {
      const url = new URL(process.env.API + "/products");
      if (occasion) {
        url.searchParams.append("occasion", occasion);
      }
      const res = await fetch(url);
      return res.json();
    },
  });

  const handleOccasionChange = (value: string) => {
    setValue("occasion", value);
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("occasion", value);
    } else {
      params.delete("occasion");
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <Card className="w-[302px] p-6 rounded-[20px] bg-white shadow-lg space-y-4 rtl:space-x-reverse">
      <h3 className="font-bold text-blue-gray-900 leading-[44px] border-b pb-3 last:border-b-0 cupitalize rtl:text-right">
        {t("occasion")}
      </h3>
      <RadioGroup
        className=" text-custom-rose-900 "
        value={occasion || ""}
        onValueChange={handleOccasionChange}
      >
        {occasions.map((occ) => (
          <div key={occ._id} className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value={occ._id} id={`occasion-${occ._id}`} />
              <Label
                htmlFor={`occasion-${occ._id}`}
                className="text-blue-gray-500 leading-5 text-sm font-inter rtl:text-right"
              >
                {occ.name}
              </Label>
            </div>
            <span className="text-blue-gray-500">({occ.productsCount})</span>
          </div>
        ))}
      </RadioGroup>

      {isLoading && <p className="rtl:text-right">Loading products...</p>}
      {occasion && (
        <div className="rtl:text-right">
          <pre>{JSON.stringify(occasion)}</pre>
        </div>
      )}
    </Card>
  );
}

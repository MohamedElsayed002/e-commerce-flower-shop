"use client";

import { useGetAllCategories } from "@/hooks/statistics/use-get-all-categories";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CategoriesSkeleton } from "../skeletons/stats/categories-skeleton";
import { useTranslations } from "next-intl";

export function AllCategories() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { data, error, isPending } = useGetAllCategories();

  // Loading
  if (isPending) return <CategoriesSkeleton />;

  // Error
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="bg-white rounded-xl">
      {/* Title */}
      <h1 className="px-5 pt-5 pb-2 text-xl text-black font-bold">{t("all-catgories")}</h1>

      {/* Scroll area */}
      <ScrollArea className="w-[582px] h-[326px] bg-white p-5 ">
        <div>
          {data?.map((item) => {
            return (
              <div className="border-b last:border-b-0 p-2 flex justify-between" key={item._id}>
                {/* Item title / Left side */}
                <h1 className="text-black capitalize">{item.name}</h1>

                {/* Item count / Right side*/}
                <Badge className="bg-gray-100 text-black hover:bg-gray-300">
                  {item.productsCount} {t("products")}
                </Badge>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

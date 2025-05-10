import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { getAllCategories } from "@/lib/apis/dashboard/categories.api";

export async function AllCategories() {
  // Translations
  const t = await getTranslations();

  // Data
  const data = await getAllCategories();

  return (
    <div className="bg-white rounded-xl shadow-md w-full h-[326px] ">
      {/* Title */}
      <h1 className="px-5 pt-5 pb-2 text-2xl text-black font-bold">{t("all-catgories")}</h1>

      {/* Scroll area */}
      <ScrollArea className=" h-[250px] bg-white p-5 ">
        <div>
          {data.categories.map((item) => {
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

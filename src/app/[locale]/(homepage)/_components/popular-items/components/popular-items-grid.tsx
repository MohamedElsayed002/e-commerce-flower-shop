import { getTranslations } from "next-intl/server";
import PopularItemsData from "./popular-items-data";

type PopularItemsGridProps = {
  categoryId: string;
};

export default async function PopularItemsGrid({ categoryId }: PopularItemsGridProps) {
  // Translation
  const t = await getTranslations();

  // Fetch the data server-side
  const response = await fetch(
    `http://localhost:3000/api/filtered-products?category=${categoryId}&sort=-sold`
  );
  const payload = await response.json();

  // Debugging: Log the fetched products
  console.log("Filtered Products", payload);

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Show a "Coming Soon" message if no products are available */}
      {payload.length === 0 ? (
        <div className="col-span-4 text-center text-xl font-semibold text-blue-gray-900">
          {t("coming-soon")}
        </div>
      ) : (
        // Grid displaying the best seller products
        payload.map((product: Product, index: number) => (
          <PopularItemsData product={product} key={index} />
        ))
      )}
    </div>
  );
}

import React from "react";
import { getTranslations } from "next-intl/server";
import QuantitySelector from "./quantity-selector";

// Type
type Productprops = {
  product: Product;
};

export default async function Content({ product }: Productprops) {
  // Translations
  const t = await getTranslations();

  return (
    <>
      <div className=" flex flex-col justify-between w-[550px] ">
        <div className="flex flex-col gap-10">
          {/* Product title */}
          <h2 className="text-[25px] font-semibold">{product.title}</h2>

          <div className="flex gap-[5px] items-center ">
            {/* Product price */}
            <span className="text-gray-600 line-through text-[18px] font-medium ">
              <h1>${product.price}</h1>
            </span>

            {/* Price after discount */}
            <span className="text-custom-rose-900 text-[23px] font-medium ">
              {" "}
              <h1>${product.priceAfterDiscount}</h1>
            </span>

            {/* Product discount */}
            <span className="text-red-500 text-[15px] font-medium ">
              <h1>
                {product.discount}
                {t("off")}
              </h1>
            </span>
          </div>

          {/* Product description */}
          <p className="text-[#757F95] text-[16px] font-normal leading-[28.8px] mb-5">
            {product.description}
          </p>

          {/* Stock status */}
          <li className="text-[16px] font-medium gap-2 text-blue-gray-500">
            {t("stock")}:{" "}
            {product.quantity > 0 ? (
              <span className=" text-[16px] font-normal text-blue-gray-500">{t("in-stock")}</span>
            ) : (
              <span className="text-red-500">{t("out-of-stock")}</span>
            )}
          </li>
        </div>

        {/* Check quantity && Quantity selector */}
        {product.quantity > 0 && (
          <QuantitySelector maxQuantity={product.quantity} productid={product._id} />
        )}
      </div>
    </>
  );
}

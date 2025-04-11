import React from "react";
import { getFormatter, getTranslations } from "next-intl/server";
import QuantitySelector from "./quantity-selector";

type Productprops = {
  product: Product;
};

export default async function Content({ product }: Productprops) {
  // Translations
  const t = await getTranslations();
  const format = await getFormatter();

  return (
    <div className=" flex flex-col justify-between w-[550px] ">
      <div className="flex flex-col ">
        {/* Product title */}
        <h2 className="text-[25px] font-semibold">{product.title}</h2>

        {/* Details */}
        <div className="flex gap-[5px] items-center mt-4 ">
          {/* Product price */}
          <p className="text-gray-600 line-through text-[18px]  font-medium ">
            {format.number(product.price, {
              currency: "USD",
              style: "currency",
            })}
          </p>

          {/* Price after discount */}
          <p className="text-custom-rose-900 text-[23px] font-medium ">
            {format.number(product.priceAfterDiscount, {
              currency: "USD",
              style: "currency",
            })}
          </p>

          {/* Product discount */}
          <p className="text-red-500 text-[15px] font-medium ">
            {format.number(product.discount, {
              style: "percent",
            })}
            {t("off")}
          </p>
        </div>

        {/* Product description */}
        <p className="text-[#757F95] text-[16px] font-normal leading-[28.8px] mt-5">
          {product.description}
        </p>

        {/* Stock status */}
        <li className="text-[16px] font-medium gap-2 text-blue-gray-500 mt-4">
          {t("stock")}:{" "}
          {product.quantity > 0 ? (
            <span className=" text-[16px] font-normal text-blue-gray-500">{t("in-stock")}</span>
          ) : (
            <span className="text-red-500">{t("out-of-stock")}</span>
          )}
        </li>
      </div>

      {/* Check quantity && Quantity selector */}
      <div className="mt-4">
        {product.quantity > 0 && (
          <QuantitySelector maxQuantity={product.quantity} productid={product._id} />
        )}
      </div>
    </div>
  );
}

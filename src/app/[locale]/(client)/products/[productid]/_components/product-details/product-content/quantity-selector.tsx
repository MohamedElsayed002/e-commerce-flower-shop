"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoLockClosedOutline } from "react-icons/io5";
import { addProductToCart } from "@/lib/actions/product.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

// Type
type QuantitySelectorProps = {
  maxQuantity: number;
  productid: string;
};

export default function QuantitySelector({ productid, maxQuantity }: QuantitySelectorProps) {
  // Translations
  const t = useTranslations();

  // State
  const [quantity, setQuantity] = useState(1);

  // Mutation
  const mutation = useMutation({
    mutationFn: async (quantity: number) => {
      const response = await addProductToCart(productid, quantity);
      return response;
    },

    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(t("product-added-to-cart-successfully"));
      }
    },

    // Show error notification
    onError: (error) => {
      toast.error("Failed to add product to cart");
      console.error(error);
    },
  });

  // Functions
  const increaseQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <>
      <div className="flex gap-8 items-center  ">
        {/* Quantity selector ui*/}
        <div className="flex flex-col gap-[16px]">
          <h1 className="text-[16px] font-medium text-blue-gray-500">{t("quantity")}</h1>
          <div className="flex items-center ">
            {/* Decrease quantity button */}
            <button
              type="button"
              className=" w-[35px] h-[35px] rounded-[50px]  bg-[#FEEDF7] "
              onClick={decreaseQuantity}
            >
              <span className="text-custom-rose-900 w-[12.46px] h-[1.4px] rounded-full">−</span>
            </button>

            {/* Quantity */}
            <span className="w-[30.8px] h-[30.8px] text-[16px] font-normal text-custom-rose-900 flex items-center justify-center">
              {quantity}
            </span>

            {/* Increase quantity button */}
            <button
              type="button"
              className=" w-[35px] h-[35px] rounded-[50px]  bg-[#FEEDF7]"
              onClick={increaseQuantity}
            >
              <span className="text-custom-rose-900 w-[12.46px] h-[1.4px] rounded-full">+</span>
            </button>
          </div>
        </div>

        {/* Add to cart button */}
        <div>
          <Button
            onClick={() => mutation.mutate(quantity)}
            className="w-[144px] h-[45px] mt-7 bg-custom-rose-900 text-[16px] font-medium rounded-[10px]"
          >
            <span>
              <IoLockClosedOutline className="w-[14px] h-[16px]" />
            </span>
            {t("add-to-cart")}
          </Button>
        </div>
      </div>
    </>
  );
}

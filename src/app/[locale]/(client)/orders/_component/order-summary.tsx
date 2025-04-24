"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";

type OrderSummaryProps = {
  cart: Cart;
};

export default function OrderSummarY({ cart }: OrderSummaryProps) {
  // Translations
  const t = useTranslations();

  // Navigation
  const formatter = useFormatter();

  return (
    <div className="max-w-3xl mx-auto py-2 px-4">
      <div key={cart._id} className="border-2 border-custom-rose-900 rounded-2xl p-4 mb-6">
        <Card className="bg-main-color rounded-2xl shadow-sm">
          <CardContent className="p-6">
            {/* Order header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-blue-gray-500">
                  {formatter.dateTime(new Date(cart.createdAt), {
                    dateStyle: "medium",
                  })}
                </p>
              </div>
            </div>

            {/* Order items */}
            <div className="mb-6">
              <h5 className="font-bold mb-3 text-blue-gray-900">{t("order-items")}</h5>
              <div className="space-y-4">
                {cart.cartItems.map((item) => (
                  <div key={item._id} className="flex items-start gap-4 py-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={item.product.imgCover}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <h6 className="font-medium text-gray-900">{item.product.title}</h6>
                      <p className="text-sm text-gray-500">
                        {t("quantity:")} {item.quantity}
                      </p>
                      <div className="mt-1">
                        <span className="text-sm line-through text-gray-400 mr-2">
                          {formatter.number(item.product.price, {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                        <span className="text-sm text-red-600">
                          {formatter.number(item.product.priceAfterDiscount, {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">
                        {formatter.number(item.product.priceAfterDiscount * item.quantity, {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary */}
            <div className="border-t border-gray-200 pt-4">
              <h5 className="mb-3 text-blue-gray-900 font-bold">{t("cart-summary")}</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-gray-900 font-bold">{t("subtotal")}</span>
                  <span className="text-custom-gray">
                    {formatter.number(cart.totalPrice, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-gray-900 font-bold">{t("discount")}</span>
                  <span className="text-red-600">
                    -
                    {formatter.number(cart.totalPrice - cart.totalPriceAfterDiscount, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-gray-900 font-bold">{t("shipping")}</span>
                  <span className="text-custom-gray">Free</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-blue-gray-900 font-bold">{t("total")}</span>
                  <span className="text-custom-rose-900 font-bold">
                    {formatter.number(cart.totalPriceAfterDiscount, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

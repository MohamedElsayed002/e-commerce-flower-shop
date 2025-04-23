"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";

// Types
type Props = {
  orders: Order[];
};
export default function OrderSummary({ orders }: Props) {
  console.log("Orders:", orders);

  // Translations
  const t = useTranslations();

  // Formatter
  const formatter = useFormatter();
  const calculateOrderValues = (order: Order) => {
    const subtotal = order.orderItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const TotalPrice = order.orderItems.reduce((sum, item) => sum + item.price, 0);
    console.log("Actual Total:", TotalPrice);
    console.log("Subtotal:", subtotal);
    const discount = subtotal * 0.5;
    const taxes = TotalPrice * 0.14;

    return {
      subtotal,
      discount,
      taxes,
      totalPrice: order.totalPrice + taxes,
    };
  };

  return (
    <div className="max-w-3xl mx-auto py-2 px-4">
      {orders.map((order) => {
        const { subtotal, discount, taxes, totalPrice } = calculateOrderValues(order);

        return (
          <div key={order._id} className="border-2 border-custom-rose-900 rounded-2xl p-4 mb-6">
            <Card className="bg-main-color rounded-2xl shadow-sm">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-blue-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium">
                    {order.paymentType.charAt(0).toUpperCase() + order.paymentType.slice(1)}
                  </span>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h5 className="font-bold mb-3 text-blue-gray-900">{t("order-items")}</h5>
                  <div className="space-y-4">
                    {order.orderItems.map((item) => {
                      // const hasDiscount = item.product.discount > 0;
                      const originalTotal = item.product.price * item.quantity;

                      return (
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
                            <h6 className="font-medium text-gray-900 rlt-text-left">
                              {item.product.title}
                            </h6>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-400">
                              {formatter.number(originalTotal, {
                                style: "currency",
                                currency: "USD",
                              })}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <h5 className="mb-3 text-blue-gray-900 font-bold">{t("cart-summary")} </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-gray-900 font-bold">{t("subtotal")}</span>
                      <span className="text-custom-gray">
                        {formatter.number(subtotal, { style: "currency", currency: "USD" })}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-blue-gray-900 font-bold">{t("discount")}</span>
                        <span className="text-red-600">
                          {formatter.number(-discount, { style: "currency", currency: "USD" })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-blue-gray-900 font-bold">{t("shipping")}</span>
                      <span className="text-custom-gray">{t("free")}</span>
                    </div>
                    {taxes > 0 && (
                      <div className="flex justify-between">
                        <span className="text-blue-gray-900 font-bold">{t("taxes")}</span>
                        <span className="text-custom-gray">
                          {formatter.number(taxes, { style: "currency", currency: "USD" })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-200 font-bold mt-2">
                      <span className="text-blue-gray-900">{t("total")}</span>
                      <span className="text-custom-rose-900">
                        {formatter.number(totalPrice, { style: "currency", currency: "USD" })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useRouter } from "next/navigation";

type OrdersPropes = {
  orders: Order[];
};

export default function Orders({ orders }: OrdersPropes) {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  return (
    <div className="max-w-4xl w-full mx-auto px-4 space-y-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="p-4 border  border-custom-rose-900 rounded-xl shadow-sm bg-white space-y-4"
        >
          {/* Order number */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-blue-gray-800">
              {t("order-number")}: {order.orderNumber}
            </h2>

            {/* Order status */}
            <div className="text-sm  flex gap-3">
              <span className="text-custom-rose-900 border border-custom-rose-900  rounded-xl p-2">
                {t("order-state")}: {order.state}
              </span>

              {/* payment type */}
              <span className="text-custom-rose-900 border border-custom-rose-900  rounded-xl p-2">
                {t("payment-method")}: {order.paymentType}
              </span>
            </div>
          </div>

          {/* Order date */}
          <div className="text-sm text-blue-gray-500">
            {t("order-date")}:{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>

          {/* Products */}
          <div className="space-y-2">
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 ">
                <Image
                  src={item.product.imgCover}
                  alt={item.product.title}
                  width={80}
                  height={80}
                  className="rounded-md object-cover cursor-pointer"
                  onClick={() => router.push(`/products/${item.product._id}`)}
                />

                {/* Product title */}
                <span className="font-medium text-blue-gray-800">{item.product.title}</span>
              </div>
            ))}
          </div>

          {/* Order total price */}
          <div className="text-right font-semibold text-custom-rose-900">
            {t("total-price")}: ${order.totalPrice}
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        {/* Button navigates to the products page */}
        <Link
          href={`/`}
          className="w-fit flex items-center gap-2 px-5 py-3 bg-custom-rose-900 text-white rounded-lg"
        >
          {t("continue-shopping")}
        </Link>

        {/* Button navigates to the cart page */}
        <Link
          href={`/cart`}
          className="w-fit flex items-center gap-2 px-8 py-2 bg-custom-rose-900 text-white rounded-lg"
        >
          {t("view-cart")}
        </Link>
      </div>
    </div>
  );
}

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
          className="p-4 border border-custom-rose-900 rounded-xl shadow-sm bg-white space-y-4 "
        >
          {/* Order number */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-blue-gray-800">
              {t("order-number")}: {order.orderNumber}
            </h2>

            {/* Order data */}
            <div className="text-sm text-blue-gray-500">
              {t("order-date")}:{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Products */}
          <div className="flex">
            <div className="flex flex-col mt-4">
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  // OnClick to navigate to the product page
                  onClick={() => router.push(`/products/${item.product._id}`)}
                >
                  {/* Product image */}
                  <Image
                    src={item.product.imgCover}
                    alt={item.product.title}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />

                  {/* Product title */}
                  <span className="font-medium text-blue-gray-800">
                    {item.product.title.split(" ").splice(0, 3).join(" ")}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-end ml-auto gap-4 rtl:ml-0 rtl:mr-auto">
              {/* Payment type */}
              <span className="text-custom-rose-900">
                {t("payment-method")}: {order.paymentType}
              </span>

              {/* Order status */}
              <span className="text-custom-rose-900">
                {t("order-state")}: {order.state}
              </span>

              {/* Map for order items */}
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex flex-col items-end gap-2">
                  {/* Order items price */}
                  <span className="text-custom-rose-900">
                    {t("price")}: ${item.price}
                  </span>

                  {/* Orderitems quantity */}
                  <span className="text-custom-rose-900">
                    {t("quantity")}: {item.quantity}
                  </span>
                </div>
              ))}

              {/* Order total price */}
              <span className="border border-custom-rose-900 font-semibold text-custom-rose-900 p-2 rounded-lg">
                {t("total-price")}: ${order.totalPrice}
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        {/* Button */}
        <Link
          href={`/`}
          className="w-fit flex items-center gap-2 px-5 py-3 bg-custom-rose-900 text-white rounded-lg"
        >
          {t("continue-shopping")}
        </Link>

        {/* Button */}
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

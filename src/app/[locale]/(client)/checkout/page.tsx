import React from "react";
import CheckoutContent from "./_components";
import { fetchCartOrders } from "@/lib/apis/order.api";

export default async function CheckoutPage() {
  const { cart } = await fetchCartOrders();
  return <CheckoutContent cart={cart} />;
}

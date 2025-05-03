import React from "react";
import CheckoutContent from "./_components";
import { fetchCartOrders } from "@/lib/apis/order.api";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const { cart } = await fetchCartOrders();

  // Redirect to homepage if the cart is empty
  if (cart.cartItems.length === 0) {
    redirect("/");
  }
  return <CheckoutContent cart={cart} />;
}

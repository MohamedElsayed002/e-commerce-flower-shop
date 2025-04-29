import { redirect } from "next/navigation";
import { fetchOrders } from "@/lib/apis/order.api";
import CartSummary from "./cart-summary";

export default async function SummaryWrapper() {
  const data = await fetchOrders();

  if (!data.cart || !data.cart.cartItems || data.cart.cartItems.length === 0) {
    redirect("/");
  }

  return (
    <>
      <CartSummary cart={data.cart} />
    </>
  );
}

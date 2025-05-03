"use client";
import CartSummary from "./cart-summary";

export default function SummaryWrapper({ cart }: { cart: Cart }) {
  return (
    <>
      <CartSummary cart={cart} />
    </>
  );
}

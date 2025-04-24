import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { fetchOrders } from "@/lib/apis/order.api";
import OrderMessage from "./order-mesage";
import OrderSummary from "./order-summary";
import CatButton from "./button";

export default async function SummaryWrapper() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  try {
    const data = await fetchOrders();
    // console.log("Orders data:", data);

    // Check for cart items instead of orders
    if (!data.cart || !data.cart.cartItems || data.cart.cartItems.length === 0) {
      redirect("/");
    }

    return (
      <>
        <OrderMessage />
        <OrderSummary cart={data.cart} />
        <CatButton />
      </>
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return <div>Error loading orders. Please try again later.</div>;
  }
}

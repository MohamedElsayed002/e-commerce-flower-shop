import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { PaymentForm } from "./_component/paymant";
import { fetchOrders } from "@/lib/apis/order.api";

export default async function Page() {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetchOrders();

    console.log("Orders data:", response);

    if (!session?.user || !response.cart || response.cart.cartItems.length === 0) {
      redirect("/");
    }

    return <PaymentForm />;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return <div>Please try again later.</div>;
  }
}

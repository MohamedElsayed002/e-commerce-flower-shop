import { fetchOrders } from "@/lib/apis/order.api";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { PaymentForm } from "./_component/paymant";

export default async function Page() {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetchOrders();

    if (!session?.user || !response.orders || response.orders.length === 0) {
      redirect("/");
    }

    return <PaymentForm />;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return <div>Error loading orders. Please try again later.</div>;
  }
}

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { fetchOrders } from "@/lib/apis/order.api";
import { PaymentForm } from "./payment";

export default async function PaymentWrapper() {
  // GetSession
  const session = await getServerSession(authOptions);

  const response = await fetchOrders();

  // Redirect if not logged in or cart is empty
  if (!session?.user || !response.cart || response.cart.length === 0) {
    redirect("/");
  }

  return <PaymentForm />;
}

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { fetchOrders } from "@/lib/apis/order.api";
import { PaymentForm } from "./paymant";

export default async function PaymentWrapper() {
  const session = await getServerSession(authOptions);

  const response = await fetchOrders();

  if (!session?.user || !response.cart || response.cart.length === 0) {
    redirect("/");
  }

  return <PaymentForm />;
}

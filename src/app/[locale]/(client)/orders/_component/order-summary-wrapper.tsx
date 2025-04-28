import { fetchLatestOrder } from "@/lib/apis/orders.api";
import OrderMessage from "./order-mesage";
import OrderDetails from "./order-summary";

export default async function Ordersummary() {
  const order = await fetchLatestOrder();
  console.log("order", order);
  return (
    <div className="container mx-auto p-4">
      <OrderMessage />
      <OrderDetails order={order} />
    </div>
  );
}

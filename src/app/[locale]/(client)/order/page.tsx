import { fetchOrders } from "@/lib/apis/orders.api";
import Orders from "./_components/orders/order";

export default async function Page() {
  // Function
  const payload = await fetchOrders();

  return (
    <div className="flex flex-col">
      <div className="container m-auto flex gap-[40px] py-20">
        <Orders orders={payload?.orders || []} />
      </div>
    </div>
  );
}

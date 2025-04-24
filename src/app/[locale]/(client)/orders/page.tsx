// import { fetchOrders } from "@/lib/apis/order.api";
// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/auth";
// import OrderMessage from "./_component/order-mesage";
// import OrderSummary from "./_component/OrderSummary";

// export default async function Page() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user) {
//     redirect("/");
//   }

//   try {
//     const response = await fetchOrders();
//     console.log("Orders00:", response);
//     console.log("Orders000000:", response.orders);

//     if (!response.orders || response.orders.length === 0) {
//       redirect("/");
//     }

//     return (
//       <>
//         <OrderMessage />
//         <OrderSummary orders={response.orders} />
//         </>
//     );
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return <div>Error loading orders. Please try again later.</div>;
//   }
// }
import React from "react";
import SummaryWrapper from "./_component/order-summary-wrapper";

export default function page() {
  return (
    <div>
      <SummaryWrapper />
    </div>
  );
}

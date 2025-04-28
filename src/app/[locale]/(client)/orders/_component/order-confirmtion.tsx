// "use client";

// import * as React from "react";
// import { useTranslations } from "next-intl";
// import Image from "next/image";
// import { Link } from "@/i18n/routing";
// import { useRouter } from "@/i18n/routing";

// type OrderProps = {
//   order: Order[];
// };

// export default function OrderDetails({ order }: OrderProps) {
//   console.log("order", order);
//   // Translation
//   const t = useTranslations();

//   // Navigation
//   const router = useRouter();

//   return (
//     <div className="max-w-4xl w-full mx-auto px-4 space-y-6">
//       {!order ? (
//         <div className="text-center py-20 text-blue-gray-800 space-y-4 border border-custom-rose-900 rounded-lg ">
//           <p className="text-sm">{t("you-do-not-have-an-order")}</p>
//         </div>
//       ) : (
//         order.map((order) => (
//           <div
//             key={order._id}
//             className="p-4 border border-custom-rose-900  rounded-lg shadow-sm bg-white space-y-4"
//           >
//             {/* Order number */}
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold text-blue-gray-800">
//                 {t("order-number")}: {order.orderNumber}
//               </h2>

//               {/* Order date */}
//               <div className="text-sm text-blue-gray-500">
//                 {t("order-date")}:{" "}
//                 {new Date(order.createdAt).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "short",
//                   day: "numeric",
//                 })}
//               </div>
//             </div>

//             {/* Products */}
//             <div className="flex">
//               <div className="flex flex-col mt-4"></div>

//               <div className="flex flex-col items-end ml-auto gap-4 rtl:ml-0 rtl:mr-auto">
//                 {/* Payment type */}
//                 <span className="text-custom-rose-900">
//                   {t("payment-method")}: {order.paymentType}
//                 </span>

//                 {/* Order status */}
//                 <span className="text-custom-rose-900">
//                   {t("order-state")}: {order.state}
//                 </span>

//                 {/* Map for order items */}
//                 {order.orderItems.map((item) => (
//                   <div key={item._id} className="flex flex-col items-end gap-2">
//                     {/* Order items price */}
//                     <span className="text-custom-rose-900">
//                       {t("price")}: ${item.price}
//                     </span>

//                     {/* Orderitems quantity */}
//                     <span className="text-custom-rose-900">
//                       {t("quantity")}: {item.quantity}
//                     </span>
//                   </div>
//                 ))}

//                 {/* Order total price */}
//                 <span className="border border-custom-rose-900 font-semibold text-custom-rose-900 p-2 rounded-lg">
//                   {t("total-price")}: ${order.totalPrice}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       <div className="flex justify-between">
//         {/* Button */}
//         <Link
//           href={`/`}
//           className="w-fit flex items-center gap-2 px-5 py-3 bg-custom-rose-900 text-white rounded-lg"
//         >
//           {t("continue-shopping")}
//         </Link>

//         {/* Button */}
//         <Link
//           href={`/cart`}
//           className="w-fit flex items-center gap-2 px-8 py-2 bg-custom-rose-900 text-white rounded-lg"
//         >
//           {t("view-cart")}
//         </Link>
//       </div>
//     </div>
//   );
// }
import React from "react";

export default function Orderconfirmtion() {
  return <div>order-confirmtion</div>;
}

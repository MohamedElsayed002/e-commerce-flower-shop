// import Link from "next/link";

// export default function PaymentSuccess() {
//   return (
//     <div className="max-w-3xl mx-auto py-8 px-4 text-center">
//       <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
//       <p>Your order has been placed and your cart has been cleared.</p>
//       <Link href="/" className="text-custom-rose-900 mt-4 inline-block">
//         Return to Home
//       </Link>
//     </div>
//   );
// }

// /components/continue-shopping-button.tsx
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ContinueShoppingButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/")}
      className="bg-rose-900 text-white rounded-xl px-6 py-2 hover:bg-rose-800"
    >
      متابعة التسوق
    </Button>
  );
}

// import { getCheckoutUrl } from "@/lib/apis/order.api";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const orderId = req.nextUrl.searchParams.get("orderId");
//   if (!orderId) {
//     return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
//   }

//   try {
//     const url = await getCheckoutUrl(orderId);
//     return NextResponse.json({ url });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

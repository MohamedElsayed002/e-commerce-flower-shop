// "use client";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { RiVisaLine } from "react-icons/ri";
// import { PiMoneyWavyLight } from "react-icons/pi";
// import ArrowLeft from "@/components/common/arrow-long-left";
// import ArrowRight from "@/components/common/arrow-right";
// import { cn } from "@/lib/utils";
// import { z } from "zod";
// import { useRouter } from "@/i18n/routing";
// import { toast } from "sonner";
// import { AccordionHeader } from "@radix-ui/react-accordion";
// import { useTranslations } from "next-intl";
// import { checkoutWithStripe, createCashOrder } from "@/lib/apis/paymant.api";

// const paymentSchema = z.object({
//   name: z.string().min(1, "Card holder name is required"),
//   number: z.string().min(1, "Card number is required"),
//   expiry: z.string().min(1, "Expiry date is required"),
//   ccv: z.string().min(1, "CCV is required"),
// });

// export function PaymentForm() {
//   const [paymentType, setPaymentType] = useState<"cash" | "card">("cash");
//   const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
//     street: "",
//     phone: "",
//     city: "",
//     lat: "",
//     long: "",
//   });
//   const dummyShippingAddress = {
//     street: "123 Flower St",
//     phone: "+1234567890",
//     city: "Cairo",
//     lat: "30.0444",
//     long: "31.2357",
//   };
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({
//     resolver: zodResolver(paymentSchema),
//   });

//   const t = useTranslations();
//   const router = useRouter();
//   const onSubmit = async () => {
//     console.log("Payment Type:", paymentType);
//     // debugger;
//     try {
//       if (paymentType === "card") {
//         const stripeUrl = await checkoutWithStripe(dummyShippingAddress);
//         window.location.href = stripeUrl; // Use direct redirect
//       } else if (paymentType === "cash") {
//         toast.success("Order placed successfully!");
//         await createCashOrder(dummyShippingAddress);
//         router.replace("/");
//       }
//     } catch (error) {
//       toast.error(error instanceof Error ? error.message : "Payment failed. Please try again.");
//       console.error("Payment Error:", error);
//     }
//   };
//   return (
//     <>
//       <Accordion type="single" collapsible defaultValue="payment" className="w-[874px] space-y-4">
//         <AccordionItem value="ordring">
//           <AccordionTrigger className="font-semibold text-custom-rose-900 p-3 rounded-lg">
//             <AccordionHeader className="text-xl">Your Payment Info</AccordionHeader>
//           </AccordionTrigger>

//           <AccordionContent>
//             <Card className="p-6">
//               {/* Payment Method */}
//               <div className="flex gap-4 mb-6">
//                 <button
//                   type="button"
//                   onClick={() => setPaymentType("card")}
//                   className={cn(
//                     "flex flex-col items-center justify-center gap-1 border rounded-[20px] px-2 pt-4 pb-4 w-[129px] h-[125px]",
//                     paymentType === "card"
//                       ? "border-custom-rose-500 text-custom-rose-900"
//                       : "border-gray-300 text-muted-foreground",
//                   )}
//                 >
//                   <RiVisaLine className="w-6 h-6" />
//                   Pay With Credit Card
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setPaymentType("cash")}
//                   className={cn(
//                     "flex flex-col items-center justify-center gap-1 border rounded-[20px] px-2 pt-4 pb-4 w-[129px] h-[125px]",
//                     paymentType === "cash"
//                       ? "border-custom-rose-500 text-custom-rose-900"
//                       : "border-gray-300 text-muted-foreground",
//                   )}
//                 >
//                   <PiMoneyWavyLight className="w-6 h-6" />
//                   Pay Cash
//                 </button>
//               </div>
//               {/* Credit Card Form */}
//               {paymentType === "card" && (
//                 <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   <div>
//                     <Input
//                       placeholder="Name on Card"
//                       {...register("name")}
//                       className="focus:outline-none focus:border-custom-rose-900"
//                     />
//                     {errors.name && (
//                       <span className="text-red-500 text-sm">{errors.name.message}</span>
//                     )}
//                   </div>
//                   <div>
//                     <Input
//                       placeholder="Your Card Number"
//                       {...register("number")}
//                       className="focus:outline-none focus:border-custom-rose-900"
//                     />
//                     {errors.number && (
//                       <span className="text-red-500 text-sm">{errors.number.message}</span>
//                     )}
//                   </div>
//                   <div>
//                     <Input
//                       placeholder="Expire"
//                       {...register("expiry")}
//                       className="focus:outline-none focus:border-custom-rose-900"
//                     />
//                     {errors.expiry && (
//                       <span className="text-red-500 text-sm">{errors.expiry.message}</span>
//                     )}
//                   </div>
//                   <div>
//                     <Input
//                       placeholder="CCV"
//                       {...register("ccv")}
//                       className="focus:outline-none focus:border-custom-rose-900"
//                     />
//                     {errors.ccv && (
//                       <span className="text-red-500 text-sm">{errors.ccv.message}</span>
//                     )}
//                   </div>
//                 </form>
//               )}
//               {/* Button Footer */}
//               <div className="flex justify-between mt-4">
//                 <Button className="bg-custom-rose-900 rounded-xl" onClick={() => router.back()}>
//                   <ArrowLeft /> Previous
//                 </Button>

//                 <Button
//                   className="bg-custom-rose-900 rounded-xl"
//                   onClick={paymentType === "cash" ? onSubmit : handleSubmit(onSubmit)}
//                 >
//                   {t("pay-now")} <ArrowRight />
//                 </Button>
//               </div>
//             </Card>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </>
//   );
// }
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RiVisaLine } from "react-icons/ri";
import ArrowLeft from "@/components/common/arrow-long-left";
import ArrowRight from "@/components/common/arrow-right";
import { GiTakeMyMoney } from "react-icons/gi";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { usePayment } from "@/hooks/use-payment";

export function PaymentForm() {
  // Translation
  const t = useTranslations();

  // Navgation
  const router = useRouter();

  // State
  const [paymentType, setPaymentType] = useState<"cash" | "card">("cash");

  // Form & Validation
  const paymentSchema = z.object({
    name: z.string().min(1, t("name-schema")),
    number: z.string().regex(/^\d{16}$/, t("nunmer-schema")),
    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, t("expiry-schema")),
    ccv: z.string().regex(/^\d{3,4}$/, t("ccv-schema")),
  });

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: "",
      number: "",
      expiry: "",
      ccv: "",
    },
  });

  // DummyShippingAddress
  const dummyShippingAddress = {
    street: "123 Flower St",
    phone: "+1234567890",
    city: "Cairo",
    lat: "30.0444",
    long: "31.2357",
  };

  // HandelSubmit
  const { checkoutWithStripe, createCashOrder } = usePayment();
  const onSubmit = () => {
    if (paymentType === "card") {
      checkoutWithStripe(dummyShippingAddress);
    } else {
      createCashOrder(dummyShippingAddress);
    }
  };

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {/* Payment process */}
      <AccordionItem value="ordring">
        <AccordionTrigger
          className="text-custom-rose-900 font-inter fw-600 
          leading-[19.2px] capitalize border rounded-[5px] py-4 px-5"
        >
          {t("your-payment-info")}
        </AccordionTrigger>
        <AccordionContent>
          {/* Card */}
          <Card className="p-6">
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentType("cash")}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 border-2 rounded-[20px] p-4 w-[129px] h-[125px]",
                  paymentType === "cash"
                    ? "border-custom-rose-500 text-custom-rose-900 bg-rose-50"
                    : "border-gray-300 text-gray-500 hover:border-gray-400",
                )}
              >
                {/* Icon Cash */}
                <GiTakeMyMoney className="w-8 h-8 text-mint-green-900" />
                <span className="text-sm font-medium">{t("cash")}</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentType("card")}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 border-2 rounded-[20px] p-4 w-[129px] h-[125px]",
                  paymentType === "card"
                    ? "border-custom-rose-500 text-custom-rose-900 bg-rose-50"
                    : "border-gray-300 text-gray-500 hover:border-gray-400",
                )}
              >
                {/* Icon Visa */}
                <RiVisaLine className="w-8 h-8 text-[#051244]" />
                <span className="text-sm font-medium">{t("card")}</span>
              </button>
            </div>

            {/* Billing form */}
            {paymentType === "card" && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                >
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        {/* Label */}
                        <FormLabel className="text-base font-medium text-[#160E4B] font-roboto">
                          {t("name-card")}
                        </FormLabel>
                        {/* Input */}
                        <FormControl>
                          <Input
                            placeholder={t("card-name")}
                            {...field}
                            className="w-[413px] h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)]"
                          />
                        </FormControl>
                        {/* Message */}
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                  {/* Number */}
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        {/* Label */}
                        <FormLabel className="text-base font-medium text-[#160E4B] font-roboto">
                          {t("card-num")}
                        </FormLabel>
                        {/* Input */}

                        <FormControl>
                          <Input
                            placeholder="4242 4242 4242 4242"
                            {...field}
                            className="w-[413px] h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)]"
                          />
                        </FormControl>
                        {/* Message */}

                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                  {/* Expiry  */}
                  <FormField
                    control={form.control}
                    name="expiry"
                    render={({ field }) => (
                      <FormItem>
                        {/* Label */}
                        <FormLabel className="text-base font-medium text-[#160E4B] font-roboto">
                          {t("expiry-date")}
                        </FormLabel>
                        {/* Input */}

                        <FormControl>
                          <Input
                            placeholder="MM/YY"
                            {...field}
                            className="w-[413px] h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)]"
                          />
                        </FormControl>
                        {/* Message */}

                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                  {/* CCv */}
                  <FormField
                    control={form.control}
                    name="ccv"
                    render={({ field }) => (
                      <FormItem>
                        {/* Label */}
                        <FormLabel className="text-base font-medium text-[#160E4B] font-roboto">
                          {t("ccv")}
                        </FormLabel>
                        {/* Input */}
                        <FormControl>
                          <Input
                            placeholder="123"
                            {...field}
                            className="w-[413px] h-[48px] rounded-[8px] px-5 pt-[14px] pb-[15px] border border-[rgba(222, 226, 230, 1)]"
                          />
                        </FormControl>
                        {/* Message */}

                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}

            <div className="flex justify-between mt-4">
              <Button className="bg-custom-rose-900 rounded-xl" onClick={() => router.back()}>
                <ArrowLeft /> {t("previous")}
              </Button>

              <Button
                className="bg-custom-rose-900 hover:bg-custom-rose-700 rounded-xl"
                onClick={paymentType === "cash" ? onSubmit : form.handleSubmit(onSubmit)}
              >
                {t("pay-now")} <ArrowRight />
              </Button>
            </div>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

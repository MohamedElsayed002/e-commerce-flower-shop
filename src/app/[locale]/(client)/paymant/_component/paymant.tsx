"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { PiMoneyWavyLight } from "react-icons/pi";
import ArrowLeft from "@/components/common/arrow-long-left";
import ArrowRight from "@/components/common/arrow-right";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useRouter } from "@/i18n/routing";
import { CashOrder, checkoutWithStripe } from "@/lib/apis/paymant.api";

const paymentSchema = z.object({
  name: z.string().min(1, "Card holder name is required"),
  number: z.string().min(1, "Card number is required"),
  expiry: z.string().min(1, "Expiry date is required"),
  ccv: z.string().min(1, "CCV is required"),
});

type FormValues = {
  name: string;
  number: string;
  expiry: string;
  ccv: string;
};
type ShippingAddress = {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
};

export function PaymentForm() {
  const [paymentType, setPaymentType] = useState<"cash" | "card">("cash");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: "",
    phone: "",
    city: "",
    lat: "",
    long: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(paymentSchema),
  });

  const router = useRouter();

  const onSubmit = async () => {
    try {
      if (paymentType === "card") {
        const sessionUrl = await checkoutWithStripe(shippingAddress);
        console.log("Session URL:", sessionUrl);
        console.log("Shipping Address:", shippingAddress);
        console.log(checkoutWithStripe);
        // Redirect to the Stripe checkout page
        window.location.href = sessionUrl;
      } else {
        await CashOrder(shippingAddress);
        router.push("/orders");
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };
  console.log("Payment Type:", paymentType);
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="payment"
      className="w-[874px] space-y-4 mx-auto"
    >
      <AccordionItem value="payment">
        <AccordionTrigger className="font-semibold text-custom-rose-900 border-2 border-blue-gray-300 p-3 rounded-lg">
          <span className="text-custom-rose-900 font-semibold">Your Payment Info</span>
        </AccordionTrigger>
        <AccordionContent>
          <Card className="p-6">
            {/* Payment Method */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentType("cash")}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 border rounded-[20px] px-2 pt-4 pb-4 w-[129px] h-[125px]",
                  paymentType === "cash"
                    ? "border-custom-rose-500 text-custom-rose-900"
                    : "border-custom-gray text-muted-foreground",
                )}
              >
                <PiMoneyWavyLight className="w-6 h-6" />
                <span className="text-sm font-medium">Cash On Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentType("card")}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 border rounded-[20px] px-2 pt-4 pb-4 w-[129px] h-[125px]",
                  paymentType === "card"
                    ? "border-custom-rose-500 text-custom-rose-900"
                    : "border-gray-300 text-muted-foreground",
                )}
              >
                <RiVisaLine className="w-6 h-6" />
                Pay With Credit Card
              </button>
            </div>

            {/* Credit Card Form */}
            {paymentType === "card" && (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Input
                    placeholder="Name on Card"
                    {...register("name")}
                    className="focus:outline-none focus:border-custom-rose-900"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name.message}</span>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="Your Card Number"
                    {...register("number")}
                    className="focus:outline-none focus:border-custom-rose-900"
                  />
                  {errors.number && (
                    <span className="text-red-500 text-sm">{errors.number.message}</span>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="Expire"
                    {...register("expiry")}
                    className="focus:outline-none focus:border-custom-rose-900"
                  />
                  {errors.expiry && (
                    <span className="text-red-500 text-sm">{errors.expiry.message}</span>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="CCV"
                    {...register("ccv")}
                    className="focus:outline-none focus:border-custom-rose-900"
                  />
                  {errors.ccv && <span className="text-red-500 text-sm">{errors.ccv.message}</span>}
                </div>
              </form>
            )}

            {/* Button Footer */}
            <div className="flex justify-between mt-4">
              <Button className="bg-custom-rose-900 rounded-xl" onClick={() => router.back()}>
                <ArrowLeft /> Previous
              </Button>
              {/* <Button className="bg-custom-rose-900 rounded-xl" onClick={ ()=> router.push("/orders")}>
                Pay Now <ArrowRight />
              </Button> */}
              <Button className="bg-custom-rose-900 rounded-xl" onClick={handleSubmit(onSubmit)}>
                Pay Now <ArrowRight />
              </Button>
            </div>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

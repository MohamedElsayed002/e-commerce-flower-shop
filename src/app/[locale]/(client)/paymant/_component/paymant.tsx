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
import { checkoutWithStripe, createCashOrder } from "@/lib/apis/paymant.api";
import { toast } from "sonner";
import { AccordionHeader } from "@radix-ui/react-accordion";

const paymentSchema = z.object({
  name: z.string().min(1, "Card holder name is required"),
  number: z.string().min(1, "Card number is required"),
  expiry: z.string().min(1, "Expiry date is required"),
  ccv: z.string().min(1, "CCV is required"),
});

export function PaymentForm() {
  const [paymentType, setPaymentType] = useState<"cash" | "card">("cash");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: "",
    phone: "",
    city: "",
    lat: "",
    long: "",
  });
  const dummyShippingAddress = {
    street: "123 Flower St",
    phone: "+1234567890",
    city: "Cairo",
    lat: "30.0444",
    long: "31.2357",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(paymentSchema),
  });
  const router = useRouter();
  const onSubmit = async () => {
    console.log("Payment Type:", paymentType);
    // debugger;
    try {
      if (paymentType === "card") {
        const sessionUrl = await checkoutWithStripe(dummyShippingAddress);
        router.replace(sessionUrl);
        // window.location.assign(sessionUrl);
      } else if (paymentType === "cash") {
        toast.success("Order placed successfully!");
        await createCashOrder(dummyShippingAddress);
        router.replace("/");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Payment failed. Please try again.");
      console.error("Payment Error:", error);
    }
  };
  return (
    <>
      <Accordion type="single" collapsible defaultValue="payment" className="w-[874px] space-y-4">
        <AccordionItem value="ordring">
          <AccordionTrigger className="font-semibold text-custom-rose-900 p-3 rounded-lg">
            <AccordionHeader className="text-xl">Your Payment Info</AccordionHeader>
          </AccordionTrigger>

          <AccordionContent>
            <Card className="p-6">
              {/* Payment Method */}
              <div className="flex gap-4 mb-6">
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
                <button
                  type="button"
                  onClick={() => setPaymentType("cash")}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 border rounded-[20px] px-2 pt-4 pb-4 w-[129px] h-[125px]",
                    paymentType === "cash"
                      ? "border-custom-rose-500 text-custom-rose-900"
                      : "border-gray-300 text-muted-foreground",
                  )}
                >
                  <PiMoneyWavyLight className="w-6 h-6" />
                  Pay Cash
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
                    {errors.ccv && (
                      <span className="text-red-500 text-sm">{errors.ccv.message}</span>
                    )}
                  </div>
                </form>
              )}
              {/* Button Footer */}
              <div className="flex justify-between mt-4">
                <Button className="bg-custom-rose-900 rounded-xl" onClick={() => router.back()}>
                  <ArrowLeft /> Previous
                </Button>

                <Button
                  className="bg-custom-rose-900 rounded-xl"
                  onClick={paymentType === "cash" ? onSubmit : handleSubmit(onSubmit)}
                >
                  Pay Now <ArrowRight />
                </Button>
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

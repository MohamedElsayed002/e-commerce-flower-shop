"use client";

import { useMutation } from "@tanstack/react-query";
import { checkoutWithStripe, createCashOrder } from "@/lib/apis/paymant.api";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function usePayment() {
  // Translations
  const t = useTranslations();

  // Navgation
  const router = useRouter();

  // StripeMutation
  const stripeMutation = useMutation({
    mutationFn: checkoutWithStripe,
    onSuccess: (url: string) => {
      router.push(url);
    },
    onError: (error) => {
      toast.error(error.message || t("payment-failed"));
    },
  });

  // CashMutation
  const cashMutation = useMutation({
    mutationFn: createCashOrder,
    onSuccess: () => {
      toast.success(t("order-placed-successfully"));
      router.replace("/orders");
    },
    onError: (error) => {
      toast.error(error.message || t("payment-failed"));
    },
  });

  return {
    checkoutWithStripe: stripeMutation.mutate,
    createCashOrder: cashMutation.mutate,
    isStripeLoading: stripeMutation.isPending,
    isCashLoading: cashMutation.isPending,
  };
}

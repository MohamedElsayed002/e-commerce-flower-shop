"use client";

import { verifyOtpAction } from "@/lib/actions/auth/verify-otp.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useVerifyOtp() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (fields: VerifyOTPFields) => {
      const payload = await verifyOtpAction(fields);

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },

    onSuccess: () => {
      toast.success(t("you-can-reset-your-password"));
    },
  });

  return { verifyOTP: mutate, isPending, error };
}

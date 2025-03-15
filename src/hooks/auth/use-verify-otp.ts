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
      const result = await verifyOtpAction(fields);

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    
    onSuccess: () => {
      toast.success(t('you-can-reset-your-password'));
    }
  });

  return { verifyOTP: mutate, isPending, error };
}

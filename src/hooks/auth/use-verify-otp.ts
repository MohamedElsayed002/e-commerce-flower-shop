"use client";

import { verifyOtpAction } from "@/lib/actions/auth/verify-otp.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function useVerifyOtp() {
  // Translation
  const t = useTranslations();

  // Status
  const [showSetPasswordForm, setShowSetPasswordForm] = useState(false);

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (fields: VerifyOTPFields) => {
      const result = await verifyOtpAction(fields);

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      toast.success(t("you-can-reset-your-password"));
      setShowSetPasswordForm(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { verifyOTP: mutate, isPending, showSetPasswordForm };
}

"use client";

import { verifyOtpAction } from "@/lib/actions/auth/verify-otp.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function useVerifyOtp() {
  const t = useTranslations();
  const [showSetPasswordForm, setShowSetPasswordForm] = useState(false);

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
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  return { verifyOTP: mutate, isPending, showSetPasswordForm };
}

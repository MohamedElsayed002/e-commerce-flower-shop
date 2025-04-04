"use client";

import { forgotPasswordAction } from "@/lib/actions/auth/forgot-password.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useForgotPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (email: string) => {
      const payload = await forgotPasswordAction(email);

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t("otp-sent-success"));
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
}

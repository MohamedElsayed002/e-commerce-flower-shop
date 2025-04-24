"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function UseContact() {
  // Translation
  const t = useTranslations();

  // Mutation
  return useMutation({
    mutationFn: async (data: { email: string; phone: string; message: string; name: string }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Form Submitted:", data);
          resolve(data);
        });
      });
    },

    // Handel success
    onSuccess: () => {
      toast(t("message-sent-successfully"));
    },

    // Handel error
    onError: () => {
      toast(t("something-went-wrong-please-try-again"));
    },
  });
}

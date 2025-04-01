"use client";
import { registerAction } from "@/lib/actions/auth/register.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useRegister() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (fields: RegisterForm) => {
      const payload = await registerAction(fields);

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t("user-register-successfully"));
    },
  });

  return {
    register: mutate,
    isPending,
    error,
  };
}

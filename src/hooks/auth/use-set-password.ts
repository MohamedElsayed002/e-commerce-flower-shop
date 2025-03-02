import { setNewPasswordAction } from "@/lib/actions/auth/set-password.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function useSetNewPassword() {
  // Translation
  const t = useTranslations();

  // State
  const [showLoginForm, setShowLoginForm] = useState(false);

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (fields: SetPasswordFields) => {
      const result = await setNewPasswordAction(fields);

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      toast.success(t("password-updated-successfully"));
      setShowLoginForm(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { setPassword: mutate, isPending, showLoginForm };
}


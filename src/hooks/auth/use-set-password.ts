import { setNewPasswordAction } from "@/lib/actions/auth/set-password.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useSetNewPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: async (fields: SetPasswordFields) => {
      const payload = await setNewPasswordAction(fields);

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t("password-updated-successfully"));
    },
  });

  return { setPassword: mutate, isPending, error, isError };
}

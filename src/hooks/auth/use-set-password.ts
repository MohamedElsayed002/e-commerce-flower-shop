import { setNewPasswordAction } from "@/lib/actions/auth/set-password.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useSetNewPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (fields: SetPasswordFields) => setNewPasswordAction(fields),
    onSuccess: () => {
      toast.success(t("password-updated-successfully"));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { setPassword: mutate, isPending }
}

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
      const result = await setNewPasswordAction(fields);

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      toast.success(t('password-updated-successfully'));
    }
  });

  return { setPassword: mutate, isPending, error, isError };
}


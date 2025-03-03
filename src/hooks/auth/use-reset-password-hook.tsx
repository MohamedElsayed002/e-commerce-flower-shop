import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetPasswordAction } from "@/lib/actions/auth/reset-password-action";


export default function useResetPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation<
    ResetPasswordResponse,
    ResetPasswordError,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => resetPasswordAction(email, password),
    onSuccess: (data) => {
      if ("message" in data && data.message === "success") {
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.error || t("error"));
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}
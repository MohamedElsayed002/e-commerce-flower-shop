import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { verifyPasswordAction } from "@/lib/actions/auth/verify-password-action";


export default function useVerifyPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { error, isPending, mutate } = useMutation<
    VerifyPasswordResponse,
    VerifyPasswordError,
    { code: string }
  >({
    mutationFn: async ({ code }) => verifyPasswordAction(code),
    onSuccess: () => {
      toast.success(t("verification-success"));
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
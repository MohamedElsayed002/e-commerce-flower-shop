import { verifyPasswordAction } from "@/lib/actions/auth/verify-password-action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useVerifyPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { error, isPending, mutate } = useMutation({
    mutationFn: async (code: string) => {
      const result = await verifyPasswordAction(code);
      return result;
    },
    onSuccess: (data) => {
      toast.success(t('verification-succeed'));
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}

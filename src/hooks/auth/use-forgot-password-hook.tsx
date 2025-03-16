import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotPasswordAction } from "@/lib/actions/auth/forgot-password-action";

export default function useForgotPassword() {
  // Translation
  const t = useTranslations();

  // Mutation using fetch
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (email: string) => {
      const result = await forgotPasswordAction(email);
      return result;
    },
    onSuccess: (data) => {
      toast.success(t('otp-sent-to-your-email'));
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}

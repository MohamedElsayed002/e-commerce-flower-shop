import { verifyOtpAction } from "@/lib/actions/auth/verify-otp.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useVerifyOtp() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (fields: VerifyOTPFields) => verifyOtpAction(fields),
    onSuccess: () => {
      toast.success(t('you-can-reset-your-password'));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { verifyOTP: mutate, isPending }
}

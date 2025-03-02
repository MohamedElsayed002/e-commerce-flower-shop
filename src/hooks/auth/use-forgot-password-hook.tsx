import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotPasswordAction } from "@/lib/actions/auth/forgot-password-action";


export default function useForgotPassword() {
  // Translation
  const t = useTranslations();

  // Mutation using fetch
  const { isPending, error, mutate } = useMutation<
    ForgotPasswordResponse,
    ErrorResponse,
    { email: string }
  >({
    mutationFn: async (values) => forgotPasswordAction(values.email),
    onSuccess: (data) => {
      if ("message" in data && data.message === "success") {
        toast.success(data.info); // Display success message
      }
    },
    onError: (error) => { 
        toast.error(error.error || t('error')); // Handle API error
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}

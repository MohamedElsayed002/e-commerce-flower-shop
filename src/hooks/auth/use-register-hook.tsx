import { useTranslations } from "next-intl"; // Fixed import
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUserAction } from "@/lib/actions/auth/register-action";

export default function useRegister() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate, isError } = useMutation({
    mutationFn: async (values: RegisterForm) => {
      const result = await registerUserAction(values);
    },
    onSuccess: () => {
      toast.success(t("account-created-successfully")); // Use translations for toast messages
    },
  });

  return { isPending, error, mutate };
}

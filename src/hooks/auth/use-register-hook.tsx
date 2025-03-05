import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUserAction } from "@/lib/actions/auth/register-action";

export default function useRegister() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation<
    RegisterResponse,
    RegisterError,
    RegisterForm
  >({
    mutationFn: async (values: RegisterForm) => registerUserAction(values),
    onSuccess: (data) => {
      if ("message" in data && data.message === "success") {
        toast.success("Your account has been successfully created, please login to continue");
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
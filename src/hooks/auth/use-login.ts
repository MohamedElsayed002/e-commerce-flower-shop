import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useTranslations } from "use-intl";

export default function useLogin() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      // Handle unsuccessful response
      if (!response?.ok) {
        throw new Error(response?.error || t("invalid-email-or-password"));
      }

      return response;
    },

    // Handle successful response
    onSuccess: (data) => {
      toast.success(t("login-is-successful"));
      setTimeout(() => {
        window.location.href = data?.url || "/";
      }, 2000);
    },
  });

  return { isPending, error, login: mutate };
}

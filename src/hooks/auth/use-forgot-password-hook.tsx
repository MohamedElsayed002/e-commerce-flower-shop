import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useForgotPassword() {
  // Translation
  const t = useTranslations();

  // Mutation using fetch
  const { isPending, error, mutate } = useMutation<ForgotPasswordResponse, ErrorResponse, { email: string }>({
    mutationFn: async (values) => {
      const response = await fetch(
        "https://flower.elevateegy.com/api/v1/auth/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        }
      );

      const data: ForgotPasswordResponse = await response.json();

      if (!response.ok) {
        throw data as ErrorResponse; // Ensuring TypeScript treats it as an error response
      }

      return data as SuccessfulForgotPassword; // Treat response as success if response.ok is true
    },
    onSuccess: (data) => {
      if("message" in data && data.message === "success") {
        toast.success(data.info); // Display success message
      }
    },
    onError: (error) => {
      toast.error(error.error || t("error")); // Handle API error
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}

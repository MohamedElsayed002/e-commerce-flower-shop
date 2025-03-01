import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Define ResetPasswordResponse types
type ResetPasswordSuccess = {
  message: "success";
  token: string;
};

type ResetPasswordError = {
  error: string;
};

// Union type to handle both cases
type ResetPasswordResponse = ResetPasswordSuccess | ResetPasswordError;

export default function useResetPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation<
    ResetPasswordResponse, // Success or error response type
    ResetPasswordError, // Expected error type
    { email: string; password: string } // Mutation function input type
  >({
    mutationFn: async ({ email, password }) => {
      const response = await fetch("https://flower.elevateegy.com/api/v1/auth/resetPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword: password }),
      });

      const data: ResetPasswordResponse = await response.json();

      if (!response.ok || "error" in data) {
        if ("error" in data) {
          throw { error: data.error || t("error") }; // Throwing error response
        }
      }

      return data; // Returning success response
    },
    onSuccess: (data) => {
      if ("message" in data && data.message === "success") {
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.error || t("error")); // Show error message
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}

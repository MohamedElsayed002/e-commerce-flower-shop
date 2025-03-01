import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Using your defined API response types
export default function useVerifyPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { error, isPending, mutate } = useMutation<
    VerifyPasswordResponse, // Expected API response type (Success | Error)
    VerifyPasswordError, // Expected error type
    { code: string } // Function input type
  >({
    mutationFn: async ({ code }) => {
      const response = await fetch("https://flower.elevateegy.com/api/v1/auth/verifyResetCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetCode: code }),
      });

      const data: VerifyPasswordResponse = await response.json(); // Explicitly typed response

      if (!response.ok || "error" in data) {
        if ("error" in data) {
          throw new Error(data.error || t("error")); // Ensure correct error handling
        }
      }

      return data; // Return success response
    },
    onSuccess: () => {
      toast.success(t("verification-success")); // Show success message
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

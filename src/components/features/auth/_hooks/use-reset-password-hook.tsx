import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

export default function useResetPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await axios.put<ResetPasswordResponse>(
        `https://flower.elevateegy.com/api/v1/auth/resetPassword`,
        {
          email: data.email,
          newPassword: data.password,
        },
      );

      return response.data;
    },
    onSuccess: (data) => {
      if ("message" in data) {
        toast.success(data.message); //  Display success message
      } else if ("error" in data) {
        toast.error(data.error); // Handle API error response
      } else {
        toast.error(t("error")); //  Handle unexpected cases
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || t("error")); // Handle API errors
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}

import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

export default function useVerifyPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { error, isPending, mutate } = useMutation({
    mutationFn: async (data: { code: string }) => {
      const response = await axios.post<VerifyPasswordResponse>(
        "https://flower.elevateegy.com/api/v1/auth/verifyResetCode",
        { resetCode: data.code },
      );

      return response.data; // ✅ Extract data from response
    },
    onSuccess: (data) => {
      if ("status" in data && data.status === "Success") {
        toast.success(t("verification-success")); //  Display a success message
      } else if ("error" in data) {
        toast.error(data.error); //  Display API error message
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

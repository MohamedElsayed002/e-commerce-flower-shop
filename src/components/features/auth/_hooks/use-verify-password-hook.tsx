import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

export default function useVerifyPassword() {
  const t = useTranslations();

  const { error, isPending, mutate } = useMutation({
    mutationFn: async (data: { code: string }) => {
      console.log(data.code);
      const response = await axios.post(
        "https://flower.elevateegy.com/api/v1/auth/verifyResetCode",
        { resetCode: data.code },
      );
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.data.status);
    },
    onError: (error) => {
      console.log(error);
      toast.error((error as any)?.response?.data.error || t("error"));
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}

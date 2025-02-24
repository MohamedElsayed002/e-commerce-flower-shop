import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

export default function useForgotPassword() {
  const t = useTranslations();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await axios.post(
        `https://flower.elevateegy.com/api/v1/auth/forgotPassword`,
        { email: data.email },
      );
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.data.info);
    },
    onError: (error: any) => {
      console.error(error);
      toast.error((error as any)?.response?.data.error || t("error"));
    },
  });
  return {
    isPending,
    error,
    mutate,
  };
}

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
      console.log(data.data.info);
      toast.success("Code send successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to send code");
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}

import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

// Define the form input type
type RegisterForm = {
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
};

export default function useRegister() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: RegisterForm) => {
      const response = await axios.post<RegisterResponse>(
        "https://flower.elevateegy.com/api/v1/auth/signup",
        values,
      );

      return response.data; // ✅ Extract only `data`
    },
    onSuccess: (data) => {
      if ("message" in data) {
        toast.success(`Welcome ${data.user.firstName}! 🎉`);
      } else {
        toast.error(data.error);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || t("error"));
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}

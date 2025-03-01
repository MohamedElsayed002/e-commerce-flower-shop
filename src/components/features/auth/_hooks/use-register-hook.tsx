import { useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";



export default function useRegister() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation<RegisterResponse, RegisterError, RegisterForm>({
    mutationFn: async (values: RegisterForm) => {
      const response = await fetch("https://flower.elevateegy.com/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data: RegisterResponse = await response.json(); // Ensure correct typing

      if (!response.ok) {
        throw data as RegisterError; // Ensure it's treated as an error
      }

      return data as RegisterSuccess; // Ensure it's treated as a success response
    },
    onSuccess: (data) => {
      if ("message" in data && data.message === "success") {
        toast.success("Your account has been successfully create, please login to continue");
      }
    },
    onError: (error) => {
      toast.error(error.error || t("error"));
    },
  });

  return {
    isPending,
    error,
    mutate,
  };
}

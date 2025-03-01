import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useForgotPassword() {
  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => {
      console.log("Resending OTP to:", email);
      return new Promise((resolve) => setTimeout(resolve, 1000)); 
    },
    onSuccess: () => {
      toast.success("OTP resent successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to resend OTP");
    },
  });

  return { resendOtp: mutate, isPending };
}
import AppError from "@/lib/utils/app-error";
import { useMutation } from "@tanstack/react-query";

async function verifyOtpApi(resetCode: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/verifyResetCode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resetCode }),
  });

  const clonedResponse = response.clone();

  if (!response.ok) {
    const errorPayload = await response.json();
    throw new Error(errorPayload.error || "Failed to verify OTP");
  }

  const payload: APIResponse<VerifyOTPResponse> = await response.json();

  if ("status" in payload && payload.status === "Success") {
    return payload.status;
  }

  if ("error" in payload) {
    throw new AppError(payload.error || "Failed to verify OTP");
  }

  throw new AppError("Unexpected response format");
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (resetCode: string) => verifyOtpApi(resetCode),
  });
}

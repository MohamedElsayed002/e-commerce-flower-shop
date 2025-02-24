import AppError from "@/lib/utils/app-error";
import { useMutation } from "@tanstack/react-query";

async function setNewPassword(data: SetPasswordFields) {
  console.log("Sending request to:", `${process.env.NEXT_PUBLIC_API}/auth/resetPassword`);
  console.log("Request payload:", data);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/resetPassword`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const clonedResponse = response.clone();
  console.log("Response data:", await clonedResponse.json());

  if (!response.ok) {
    const errorPayload = await response.json();
    throw new AppError(errorPayload.error || "Failed to update password");
  }

  const payload: APIResponse<SetPasswordResponse> = await response.json();

  if ("message" in payload && payload.message === "success") {
    return payload.message;
  }

  if ("error" in payload) {
    throw new AppError(payload.error || "Failed to update password");
  }

  throw new AppError("Unexpected response format");
}

export function useSetNewPassword() {
  return useMutation({
    mutationFn: (data: SetPasswordFields) => setNewPassword(data),
  });
}
"use server";

import AppError from "@/lib/utils/app-error";

export async function verifyOtpAction(fields: VerifyOTPFields) {
  if (!fields.resetCode) {
    return { error: "OTP is required" };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/verifyResetCode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });

    const payload: APIResponse<VerifyOTPResponse> = await response.json();

    if ("status" in payload && payload.status === "Success") {
      return payload.status;
    }

    throw new AppError("Unexpected response format");
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}

"use server";

export async function verifyOtpAction(fields: VerifyOTPFields) {
  if (!fields.resetCode) {
    return { error: "OTP is required" };
  }

  const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });

  const payload: APIResponse<VerifyOTPResponse> = await response.json();

  return payload;
}

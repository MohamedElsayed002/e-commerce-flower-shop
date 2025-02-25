"use server";

export async function verifyOtp(formData: FormData) {
  const resetCode = formData.get("resetCode");

  if (!resetCode) {
    return { error: "OTP is required" };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/verifyResetCode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetCode }),
    });

    if (!response.ok) {
      const errorPayload = await response.json();
      return { error: errorPayload.error || "Failed to verify OTP" };
    }
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}

"use server";

import AppError from "@/lib/utils/app-error";

export async function setNewPasswordAction(fields: SetPassword) {
  if (!fields.email || !fields.newPassword) {
    throw new AppError("Email and new password are required");
  }

  const response = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });

  const payload:APIResponse<SetPasswordResponse> = await response.json();

  if ("message" in payload && payload.message) {
    return payload.message;
  }

  return payload;
}

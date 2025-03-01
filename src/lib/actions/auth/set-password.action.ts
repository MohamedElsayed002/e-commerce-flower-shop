"use server";

import AppError from "@/lib/utils/app-error";

export async function setNewPasswordAction(fields: SetPasswordFields) {
  if (!fields.email || !fields.newPassword) {
    return { error: "Email and new password are required" };
  }

  try {
    const response = await fetch(`${process.env.API}/auth/resetPassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });

    const payload: APIResponse<SetPasswordResponse> = await response.json();

    if ("message" in payload && payload.message === "success") {
      return payload.message;
    }

    throw new AppError("Unexpected response format");
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}

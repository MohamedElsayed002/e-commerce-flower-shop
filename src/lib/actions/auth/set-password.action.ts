"use server";

export async function setNewPasswordAction(fields: SetPasswordFields) {
  const response = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });

  const payload: APIResponse<SetPasswordResponse> = await response.json();

  return payload;
}

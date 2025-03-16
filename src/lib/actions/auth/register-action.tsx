"use server";

export async function registerUserAction(values: RegisterForm) {
  const response = await fetch(`${process.env.API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const payload: APIResponse<RegisterSuccess> = await response.json();
  if ("error" in payload) throw new Error(payload.error);
  return payload;
}

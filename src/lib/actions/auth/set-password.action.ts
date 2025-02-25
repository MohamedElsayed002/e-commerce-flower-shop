"use server";

export async function setNewPassword(formData: FormData) {
  const email = formData.get("email");
  const newPassword = formData.get("newPassword");

  if (!email || !newPassword) {
    return { error: "Email and new password are required" };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/resetPassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Failed to update password" };
    }
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}

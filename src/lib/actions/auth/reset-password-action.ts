"use server"

export async function resetPasswordAction(email: string, password: string) {
    const response = await fetch("https://flower.elevateegy.com/api/v1/auth/resetPassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword: password }),
    });
  
    const data = await response.json();
  
    if (!response.ok || "error" in data) {
      throw { error: data.error || "An error occurred" };
    }
  
    return data;
  }
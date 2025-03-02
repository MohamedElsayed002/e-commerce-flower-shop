"use server"

export async function verifyPasswordAction(code: string) {
    const response = await fetch("https://flower.elevateegy.com/api/v1/auth/verifyResetCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode: code }),
    });
  
    const data : VerifyPasswordResponse = await response.json();
    
    if (!response.ok || "error" in data) {
      throw { error: data || "An error occurred" };
    }
  
    return data;
  }
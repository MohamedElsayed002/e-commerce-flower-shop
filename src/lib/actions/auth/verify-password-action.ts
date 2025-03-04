"use server"

export async function verifyPasswordAction(code: string) {
    const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
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
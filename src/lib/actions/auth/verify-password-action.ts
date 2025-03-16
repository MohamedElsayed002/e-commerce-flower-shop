"use server"

export async function verifyPasswordAction(code: string) {
    const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode: code }),
    });
  
    const payload : VerifyPasswordResponse = await response.json();
    if ("error" in payload) throw new Error(payload.error);  
    return payload;
  }
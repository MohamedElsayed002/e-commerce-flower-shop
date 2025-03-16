"use server";

export async function forgotPasswordAction(email : string) {
    const response = await fetch(`${process.env.API}/auth/forgotPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    const payload: APIResponse<SuccessfulForgotPassword> = await response.json();
    if ("error" in payload) throw new Error(payload.error);
    return payload
}
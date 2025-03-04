"use server";

export async function forgotPasswordAction(email: string) {
    const response = await fetch(`${process.env.API}/auth/forgotPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    const data: ForgotPasswordResponse = await response.json();

    if (!response.ok) {
        if ("error" in data) {
            throw new Error(data.error)
        }
    }

    return data as SuccessfulForgotPassword;
}
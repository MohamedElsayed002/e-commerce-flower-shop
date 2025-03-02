"use server";

export async function forgotPasswordAction(email: string) {
    const response = await fetch("https://flower.elevateegy.com/api/v1/auth/forgotPassword", {
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
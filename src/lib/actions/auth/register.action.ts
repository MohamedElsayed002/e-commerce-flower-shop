"use server"

export async function registerAction(values: RegisterForm) {
    const response = await fetch(`${process.env.API}/auth/signup`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
    })

    const payload : RegisterResponse = await response.json()

    return payload
}
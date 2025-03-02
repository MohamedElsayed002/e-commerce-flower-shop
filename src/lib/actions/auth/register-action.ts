"use server"

export async function registerUserAction(values: RegisterForm) {
    const response = await fetch("https://flower.elevateegy.com/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw data;
    }
  
    return data;
  }
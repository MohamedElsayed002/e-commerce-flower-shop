"use server"

export async function registerUserAction(values: RegisterForm) {
    const response = await fetch(`${process.env.API}/auth/signup`, {
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
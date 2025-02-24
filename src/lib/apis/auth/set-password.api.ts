import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const { email, newPassword } = await request.json();

  if (email && newPassword) {
    return NextResponse.json({ message: "Password updated successfully" });
  } else {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
  }
}
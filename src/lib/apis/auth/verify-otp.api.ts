import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const { otp } = await request.json();

  if (otp) {
    return NextResponse.json({ message: "You can reset your password!" });
  } else {
    return NextResponse.json({ message: "Invalid code" }, { status: 400 });
  }
}

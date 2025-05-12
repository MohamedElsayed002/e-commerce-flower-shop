import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const image = formData.get("image") as File;

  if (!name || !image) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  return NextResponse.json({ message: "Occasion created successfully!" });
}

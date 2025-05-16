import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Translation
  const t = await getTranslations();

  const formData = await req.formData();
  const name = formData.get("name") as string;
  const image = formData.get("image") as File;

  if (!name || !image) {
    return NextResponse.json({ error: t("missing-fields") }, { status: 400 });
  }

  return NextResponse.json({ message: t("occasion-created-successfully") });
}

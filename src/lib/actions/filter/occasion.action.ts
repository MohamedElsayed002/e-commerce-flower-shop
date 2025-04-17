"use server";

import { revalidatePath } from "next/cache";

export async function handleOccasionSelect(occasionId: string) {
  const params = new URLSearchParams();
  params.set("occasion", occasionId);

  return revalidatePath(`?${params.toString()}`);
}

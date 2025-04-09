"use server"; // Declare as a server action
import { revalidatePath } from "next/cache";

export async function handleCategorySelect(productId: string) {
  const params = new URLSearchParams();
  params.set("product", productId);

  // Redirect the user (or revalidate the path for data fetching)
  return revalidatePath(`?${params.toString()}`);
}

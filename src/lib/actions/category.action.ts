"use server"; // Declare as a server action
import { revalidatePath } from "next/cache";

export async function handleCategorySelect(categoryId: string) {

  const params = new URLSearchParams();
  params.set("category", categoryId);

  // Redirect the user (or revalidate the path for data fetching)
  return revalidatePath(`?${params.toString()}`);
}

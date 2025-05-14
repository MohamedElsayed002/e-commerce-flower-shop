import Link from "next/link";
import React from "react";
// NOTE: This is a dummy category page.
export default function CategoriesPage() {
  return (
    <div>
      <Link href="/dashboard/categories/add">Add Category</Link>
      <Link href="/dashboard/categories/update">Update Category</Link>
    </div>
  );
}

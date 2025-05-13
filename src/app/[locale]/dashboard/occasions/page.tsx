import React from "react";
import AddOccasionForm from "./_components/add-occasion.form";
import UpdateOccasionForm from "./_components/update-occasion.form";
import fetchoccasionsById from "@/lib/apis/occasion.api";

export default async function OccasionsPage() {
  const occasionId = "68222d421433a666c8db9ecd";
  const occasionData = await fetchoccasionsById(occasionId); // جلب البيانات

  return (
    <div>
      <AddOccasionForm />
      <UpdateOccasionForm initialData={occasionData} occasionId={occasionId} />
    </div>
  );
}

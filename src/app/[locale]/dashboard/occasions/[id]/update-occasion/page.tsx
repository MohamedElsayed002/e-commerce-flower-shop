import fetchOccasionById from "@/lib/apis/occasion.api";
import UpdateOccasionForm from "./_components/update-occasion.form";

export default async function UpdateOccasionPage({ params }: { params: { id: string } }) {
  const occasionId = params.id;
  const occasionData = await fetchOccasionById(occasionId);

  return (
    <div className="p-3">
      {/* Update occasion form */}
      <UpdateOccasionForm initialData={occasionData} occasionId={occasionId} />
    </div>
  );
}

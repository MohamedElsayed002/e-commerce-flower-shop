import { fetchOccasions } from "@/lib/apis/occasion-api";
import OccasionFilter from "./_components/filters/occasion-filter";

export default async function ProductPage() {
  const occasionsData = await fetchOccasions();

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <OccasionFilter occasions={occasionsData?.occasions ?? []} />
    </div>
  );
}

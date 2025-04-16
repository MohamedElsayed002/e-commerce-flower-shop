import OccasionFilterWrapper from "./_components/filters/occasion-flter-wrapper";

export default async function ProductPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <OccasionFilterWrapper />
    </div>
  );
}

import PriceFilter from "./_components/filters/price-filter";

export default async function ProductPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <PriceFilter />
    </div>
  );
}

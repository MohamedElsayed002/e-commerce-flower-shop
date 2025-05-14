export default function UpdateCategorySkeleton() {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="h-8 w-48 bg-gray-200 rounded-full mb-6 animate-pulse"></div>

      <div className="bg-white w-full rounded-lg p-6 shadow-sm space-y-6">
        {/* Name Field */}
        <div className="space-y-2 w-4/5 animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-10 bg-gray-100 rounded-lg"></div>
        </div>

        {/* Image Button */}
        <div className="flex justify-end w-4/5 animate-pulse">
          <div className="h-10 w-40 bg-gray-100 rounded-lg"></div>
        </div>

        {/* Submit Button */}
        <div className="h-10 w-4/5 bg-gray-200 rounded-lg mt-8 animate-pulse"></div>
      </div>
    </div>
  );
}

export default function SkeletonCard() {
  return (
    <div className="animate-pulse card p-4" data-testid="skeleton-card">
      <div className="bg-gray-200 rounded-md h-40 w-full"></div>
      <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="mt-2 h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="mt-4 flex justify-between">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
        <div className="h-8 w-28 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

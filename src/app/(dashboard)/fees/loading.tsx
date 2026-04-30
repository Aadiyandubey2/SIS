import { Skeleton } from "@/components/ui/skeleton";

export default function FeesLoading() {
  return (
    <div className="space-y-4">
      <div>
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-4 w-56 mt-1.5" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-9 max-w-sm" />
      <Skeleton className="h-96 rounded-md" />
    </div>
  );
}

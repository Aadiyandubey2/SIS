import { Skeleton } from "@/components/ui/skeleton";

export default function StudentsLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-40 mt-1.5" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="h-9 flex-1 max-w-sm" />
        <Skeleton className="h-9 w-[130px]" />
        <Skeleton className="h-9 w-[130px]" />
      </div>

      <div className="rounded-md border border-border bg-white">
        <div className="p-0">
          {/* Header */}
          <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-muted/30">
            {[40, 60, 160, 80, 70, 80, 70, 60, 40].map((w, i) => (
              <Skeleton key={i} className="h-4" style={{ width: w }} />
            ))}
          </div>
          {/* Rows */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-0"
            >
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40 mt-1" />
              </div>
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-4 w-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

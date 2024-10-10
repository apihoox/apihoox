import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <title>Loading | APIHooX</title>
      <div className="flex items-center py-6">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="px-6 space-y-2">
          <Skeleton className="h-4 w-[1000px]" />
          <Skeleton className="h-4 w-[1000px]" />
        </div>
      </div>
      <div className="flex items-center py-6 space-x-4">
        <Skeleton className="h-[900px] w-[1080px] " />
      </div>
    </main>
  );
}

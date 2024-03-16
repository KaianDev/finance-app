import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const SkeletonTable = () => {
  const skeletonArray = Array.from({ length: 5 }).map((_, i) => i);

  return (
    <div className="py-5">
      <Skeleton className="mb-5 h-[33px] w-[99px] bg-zinc-800/30 dark:bg-zinc-600/40" />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
        {skeletonArray.map(item => (
          <Skeleton
            key={item}
            className={cn(
              "h-[40px] w-full bg-zinc-800/60 dark:bg-zinc-900/60",
              item !== 0 &&
                "bg-zinc-800/30 dark:bg-zinc-600/40 sm:bg-zinc-800/60 sm:dark:bg-zinc-900/60"
            )}
          />
        ))}
        {skeletonArray.map((item, _, array) =>
          array.map(i => (
            <Skeleton
              key={`#${i}.${item}`}
              className="hidden h-[33px] w-full bg-zinc-800/30 dark:bg-zinc-600/40 sm:block"
            />
          ))
        )}
      </div>
    </div>
  );
};

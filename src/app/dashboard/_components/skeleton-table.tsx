import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export const SkeletonTable = () => {
  const skeletonArray = Array.from({ length: 5 }).map((_, i) => i);

  return (
    <div className="py-5">
      <Table>
        <TableHeader>
          <TableRow>
            {skeletonArray.map(item => (
              <TableHead key={item}>
                <Skeleton className="h-[40px] w-full bg-zinc-800/60 dark:bg-zinc-900/60" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {skeletonArray.map(item => (
              <TableCell key={item}>
                <Skeleton className="h-[33px] w-full bg-zinc-800/30 dark:bg-zinc-600/40" />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {skeletonArray.map(item => (
              <TableCell key={item}>
                <Skeleton className="h-[33px] w-full bg-zinc-800/30 dark:bg-zinc-600/40" />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {skeletonArray.map(item => (
              <TableCell key={item}>
                <Skeleton className="h-[33px] w-full bg-zinc-800/30 dark:bg-zinc-600/40" />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {skeletonArray.map(item => (
              <TableCell key={item}>
                <Skeleton className="h-[33px] w-full bg-zinc-800/30 dark:bg-zinc-600/40" />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

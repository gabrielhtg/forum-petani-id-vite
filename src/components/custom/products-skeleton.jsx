import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card.jsx";

export const ProductsSkeleton = () => {
  return (
    <Card
      className={"flex flex-col w-[150px] md:w-full max-w-[250px] p-5 gap-2"}
    >
      <Skeleton className="w-full aspect-square" />

      <Skeleton className="w-full h-4" />
      <Skeleton className="w-8/12 h-4" />
      <Skeleton className="w-8/12 h-4 mt-3" />
    </Card>
  );
};

import { Skeleton } from "../../atoms";

export const DiscussionSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton count={4} height={77} rounded />
    </div>
  );
};

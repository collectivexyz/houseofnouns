import { HorizontalSeparator } from "components";
import { Skeleton } from "ui/atoms";

export function ProposalBodySkeleton() {
  return (
    <div>
      <div className="rounded-[20px] bg-white p-4 lg:col-span-2 lg:p-6">
        <Skeleton height={36} rounded />

        <div className="mt-5 flex flex-col space-y-4">
          <div className="space-y-2">
            <Skeleton height={18} width={100} rounded />
            <Skeleton height={24} width={240} rounded />
          </div>
          <div className="space-y-2">
            <Skeleton height={18} width={100} rounded />
            <Skeleton height={24} width={240} rounded />
          </div>
          <div className="space-y-2">
            <Skeleton height={18} width={100} rounded />
            <Skeleton height={24} width={240} rounded />
          </div>
        </div>

        <HorizontalSeparator />

        <div className="space-y-2">
          <Skeleton count={10} rounded height={24} />
        </div>
      </div>
    </div>
  );
}

export default ProposalBodySkeleton;

import { Skeleton } from "ui/atoms";

export default function LayoutSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 lg:mx-auto lg:grid-cols-4 lg:gap-8 lg:overflow-hidden 2xl:container">
      <div className="lg:h-body flex h-full flex-col space-y-1 bg-white p-4">
        <h2 className="mb-3.5 text-2xl font-semibold">Proposals</h2>

        <Skeleton count={6} height={92} className="rounded-xl" />
      </div>
    </div>
  );
}

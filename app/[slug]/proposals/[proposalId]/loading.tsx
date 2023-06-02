import { ProposalBodySkeleton } from "./components/proposal/ProposalBodySkeleton";
import { VotingViewSkeleton } from "./components/votes/VotingViewSkeleton";

export default function ProposalPageSkeleton() {
  return (
    <>
      <div className="lg:h-body lg:hide-scrollbar py-4 px-2 lg:col-span-2 lg:block lg:overflow-y-auto lg:px-0 lg:py-8">
        <ProposalBodySkeleton />
      </div>
      <div className="lg:h-body px-2 pt-8 lg:block lg:pl-0 lg:pr-2.5">
        <VotingViewSkeleton />
      </div>
    </>
  );
}

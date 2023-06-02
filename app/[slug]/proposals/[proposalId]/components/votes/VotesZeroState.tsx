import { IVote } from "database/types";
import { SupportFilter } from "types/governance/config";
import { Delegate } from "prisma-governance";

interface VotesZeroStateProps {
  absenteesFiltered: Delegate[];
  votesFiltered: IVote[];
  voteSearch: string;
  supportFilter: SupportFilter;
  proposalId: string;
}

export const VotesZeroState = ({
  absenteesFiltered,
  voteSearch,
  votesFiltered,
  supportFilter,
  proposalId,
}: VotesZeroStateProps) => {
  const showZeroState =
    (!absenteesFiltered?.length && supportFilter === SupportFilter.NOT_VOTED) ||
    (!votesFiltered?.length && supportFilter === SupportFilter.VOTED);

  if (!showZeroState) return <></>;

  return (
    <div>
      <span className="text-light-gray">
        {voteSearch ? "No votes found" : "No votes have been cast yet."}
      </span>
      {!voteSearch && (
        <a href={"#discussion"} className="flex items-center">
          <div className="border-1 bg-d-primary mt-2 w-full rounded-[40px] border py-3 text-center text-sm font-semibold text-white">
            Start a discussion
          </div>
        </a>
      )}
    </div>
  );
};

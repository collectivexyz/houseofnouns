import "server-only";

import { Blocks } from "database/models/eth/Blocks";
import { IProposal } from "database/types";
import { Text } from "ui/atoms";
import { calculateProposalDate } from "utils/calculateProposalDate";
import { timeSince, timeUntil } from "libs/utils/numbers";
import pluralize from "pluralize";
import { getQuorumVotes } from "utils/getQuorumVotes";

interface Props {
  proposal: IProposal;
}

export async function VoteTimeRemaining(props: Props) {
  const { proposal } = props;

  const blockNumber = await Blocks().getLatestBlockNumber();

  const { startBlock, endBlock } = proposal?.metadata || {};
  const startDate = calculateProposalDate(blockNumber, startBlock);
  const endDate = calculateProposalDate(blockNumber, endBlock);

  const startDateLabels = getDateLabels(startDate);
  const endDateLabels = getDateLabels(endDate);

  const votingOpen = proposal?.status === "active";

  return (
    <div className="flex shrink-0 grow-0 flex-row justify-between space-x-4 px-4 lg:px-0">
      <div>
        {startBlock > blockNumber && (
          <>
            <div className="text-light-gray text-sm">Voting starts in</div>
            <span className="flex flex-row gap-2">
              {startDateLabels.map(({ label, value }) => (
                <span key={label} className="flex flex-col">
                  <Text as="h4" className="font-semibold">
                    {value}
                  </Text>
                  <div className="text-sm">{label}</div>
                </span>
              ))}
            </span>
          </>
        )}

        {endBlock && endBlock > blockNumber && startBlock && startBlock < blockNumber && (
          <>
            <div className="text-light-gray text-sm">Voting ends in</div>
            <span className="flex flex-row gap-2">
              {endDateLabels.map(({ label, value }) => (
                <span key={label} className="flex flex-col">
                  <Text as="h4" className="font-semibold">
                    {value}
                  </Text>
                  <div className="text-sm">{label}</div>
                </span>
              ))}
            </span>
          </>
        )}

        {endBlock && endBlock < blockNumber && (
          <>
            <div className="text-light-gray text-sm">Voting ended</div>
            <Text as="h4" className="font-semibold">
              {timeSince(endDate)} ago
            </Text>
          </>
        )}
      </div>

      {!!proposal?.strategy?.quorumVotes && (
        <div>
          <div className="text-light-gray text-sm">
            {
              // @ts-ignore
              proposal?.nounsDynamicQuorum ? "Quorum (dynamic)" : "Quorum"
            }
          </div>
          <Text as="h4" className="font-semibold">
            {getQuorumVotes(proposal)} votes
          </Text>
        </div>
      )}
    </div>
  );
}

const getDateLabels = date => {
  const { days: daysUntil, hours: hoursUntil, minutes: minutesUntil } = timeUntil(date);

  return [
    { label: pluralize("day", daysUntil), value: daysUntil },
    { label: pluralize("hour", hoursUntil), value: hoursUntil },
    { label: pluralize("min", minutesUntil), value: minutesUntil },
  ];
};

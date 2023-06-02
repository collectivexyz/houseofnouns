import "server-only";

import cx from "classnames";
import { serializeSync } from "database";
import { GovernanceEntities } from "database/models/governance/GovernanceEntities";
import { IProposal, IVote, IDelegate } from "database/types";
import { ReasonTracker } from "./ReasonTracker";
import { VoteCaster } from "./VoteCaster";
import { VoteTimeRemaining } from "./VoteTimeRemaining";
import { honApi, honApiStatic } from "libs/honApi";

// TODO add in Prisma typing for votes
interface Props {
  selectedVoteType: string;
  slug: string;
  proposal: IProposal;
}

// TODO refactor vote type selection to happen thru URL params
export async function VotingView(props: Props) {
  const { selectedVoteType, slug, proposal } = props;
  const { entityId, proposalId } = proposal;

  const [{ data: votes }, { data: absentees }, entity] = await Promise.all([
    honApiStatic<IVote[]>(
      `votes`,
      { proposalId, entityId, slug },
      {
        cache: "no-store",
        revalidate: 0,
      }
    ),
    honApiStatic<IDelegate[]>("wallets", { entityId, absentOnProposalId: proposalId }),
    GovernanceEntities().findById(proposal.entityId),
  ]);
  const votingOpen = proposal?.status === "active";

  // const [selectedVoteType, setSelectedVoteType] = useState("");
  // const [selectedVoteOption, setSelectedVoteOption] = useState("");

  // TODO refactor this to be a different component

  //   const { address } = useAccount();

  // const myVote: Vote = votes?.find(
  //   (option) => option?.voter?.toLowerCase() === address?.toLowerCase()
  // );

  // TODO refactor this to not useEffect
  // useEffect(() => {
  //   setSelectedVoteType("");
  // }, [proposal.proposalId]);

  return (
    <div
      className={cx("flex h-full flex-col space-y-6 lg:pr-2.5", {
        "lg:pb-6": !votingOpen,
      })}
      id="voting-view"
    >
      {/* @ts-expect-error Server Component */}
      <VoteTimeRemaining proposal={proposal} />

      <ReasonTracker
        proposal={serializeSync(proposal)}
        votes={serializeSync(votes)}
        absentees={absentees}
      />

      {votingOpen && (
        <VoteCaster
          proposal={serializeSync(proposal)}
          votes={serializeSync(votes)}
          entity={serializeSync(entity)}
        />
      )}
    </div>
  );
}

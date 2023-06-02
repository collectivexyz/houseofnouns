import { OpenProfileDrawer } from "components/ProfileDrawer";
import { getVoteImageUrl } from "components/VoteImage";
import { IProposal, IVote } from "database/types";
import { getPossibleVoteOptions, getVoteMappings } from "libs/governance";
import { serialize } from "libs/utils/data";
import { Avatar, DateRelative, Linkify } from "ui/atoms";
import Share from "ui/icons/Share";
import { getQuorumVotes } from "utils/getQuorumVotes";
import VotesLabel from "./VotesLabel";

interface Props {
  proposal: IProposal;
  votes: IVote[];
}

export function VotesList(props: Props) {
  const { proposal, votes } = props;

  if (votes?.length <= 0) return;

  const voteMappings = getVoteMappings(proposal.type as "nouns" | "snapshot");
  const voteOptions = getPossibleVoteOptions(proposal.type as "nouns" | "snapshot");

  return (
    <>
      {votes.map(vote => (
        <div key={vote.id} className="group/vote">
          <OpenProfileDrawer
            delegateAddress={vote.voter}
            delegateProfile={{ profile: vote.profile }}
            dao={{ entityId: proposal.entityId }}
          >
            <div className="flex flex-row items-center gap-1 text-sm">
              <Avatar
                id={vote.voter}
                imageUrl={vote.profile?.profilePicture}
                size={30}
                borderRadius="lg"
              />
              <span className="max-w-[100px] truncate font-semibold">
                {vote.profile?.username || vote.voter}
              </span>
              <span
                className="whitespace-nowrap"
                style={
                  { color: voteOptions.find(({ optionId }) => optionId === vote.optionId) }?.color
                }
              >
                voted {voteMappings[vote.optionId || 0].toLowerCase()}
              </span>
            </div>

            {vote.weight > 0 && (
              <div className="mt-2 flex space-x-1">
                <VotesLabel weight={vote.weight} quorumVotes={getQuorumVotes(proposal)} />
              </div>
            )}
          </OpenProfileDrawer>

          {vote.reason && (
            <a
              href={getVoteImageUrl({
                profilePicture: vote.profile?.profilePicture,
                username: vote.profile?.username,
                reason: vote.reason,
                presetVoteType: voteMappings[vote.optionId || 0].toLowerCase(),
                numVotes: `${vote.weight}`,
                proposalId: proposal.proposalId,
                proposalTitle: proposal.title,
              })}
              className="inline-flex items-center space-x-1.5 text-sm font-semibold"
              target="_blank"
              rel="noreferrer"
            >
              <div className="mt-2  whitespace-pre-line break-words text-sm font-extralight">
                <Linkify
                  options={{
                    className: "underline text-d-primary font-medium break-all",
                    target: "_blank",
                  }}
                >
                  {vote.reason}
                </Linkify>
              </div>
            </a>
          )}
        </div>
      ))}
    </>
  );
}

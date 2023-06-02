"use client";

import { IDelegate, IProposal, IVote } from "database/types";
import { Delegate, Profile } from "prisma-governance";
import levenshtein from "js-levenshtein";
import { getVoteMappings, ProposalVoteCategory } from "libs/governance";
import { useState } from "react";
import { SupportFilter } from "types/governance/config";
import { ScrollShadow } from "ui/atoms";
import Search from "ui/pixel-icons/Search";
import { AbsenteesList } from "./AbsenteesList";
import { ProposalSupportFilter } from "./SupportFilter";
import { VotesList } from "./VotesList";
import { VotesZeroState } from "./VotesZeroState";
import { VoteTicker } from "./VoteTicker";
import Fuse from "fuse.js";

// TODO add prisma typing to votes and absentees
interface Props {
  proposal: IProposal;
  votes: IVote[];
  absentees: IDelegate[];
}

// TODO refactor supportFilter and voteSearch to use query params; refactor input to be a separate component
export function ReasonTracker(props: Props) {
  const { proposal, votes, absentees } = props;

  const [selectedVoteType, setSelectedVoteType] = useState("");

  const [supportFilter, setSupportFilter] = useState(SupportFilter.VOTED);

  const voteMappings = getVoteMappings(proposal.type as "nouns" | "snapshot");
  const votesFiltered = selectedVoteType
    ? votes.filter(vote => {
        return voteMappings[vote.optionId] === selectedVoteType;
      })
    : votes;

  const [voteSearch, setVoteSearch] = useState("");
  const fuse = new Fuse(votes, {
    threshold: 0.3,
    keys: ["profile.username", "reason"],
    distance: 1000,
  });
  const votesSearched = voteSearch
    ? fuse.search(voteSearch).map(result => result.item)
    : votesFiltered;

  return (
    <>
      {!!votes && !!votes.length && (
        <VoteTicker
          votes={votes}
          governanceType={proposal.type}
          options={proposal.options}
          selectedVoteType={selectedVoteType}
          setSelectedVoteType={setSelectedVoteType}
        />
      )}
      <ScrollShadow size="sm" className="rounded-2xl bg-white" rounded>
        <div className="h-full p-5">
          <div className="text-light-gray mb-4 flex flex-row items-center justify-between gap-2 xl:gap-4">
            <Search width={16} height={16} />
            <input
              placeholder="Search"
              className="w-[50px] flex-grow text-sm focus:outline-none"
              value={voteSearch}
              onChange={e => {
                setVoteSearch(e.target.value);
              }}
            />
            <div className="flex flex-row justify-end gap-2">
              <ProposalSupportFilter type={supportFilter} setSupportFilter={setSupportFilter} />
            </div>
          </div>

          {supportFilter !== SupportFilter.NOT_VOTED && (
            <VotesZeroState
              votesFiltered={votesSearched as IVote[]}
              absenteesFiltered={absentees as Delegate[]}
              voteSearch={voteSearch}
              supportFilter={supportFilter}
              proposalId={proposal.proposalId}
            />
          )}

          <div className="hide-scrollbar flex w-full grow flex-col space-y-6 overflow-x-hidden overflow-y-scroll pb-5">
            {supportFilter === SupportFilter.VOTED && (
              <VotesList votes={votesSearched as IVote[]} proposal={proposal} />
            )}
            {supportFilter === SupportFilter.NOT_VOTED && <AbsenteesList delegates={absentees} />}
          </div>
        </div>
      </ScrollShadow>
    </>
  );
}

const filterVotes = (
  votes: IVote[],
  selectedVoteType: string,
  voteMappings: {
    [key: number]: ProposalVoteCategory;
  }
) => {
  const votesFilteredByOption = votes.filter(vote => {
    if (!selectedVoteType) {
      return true;
    }

    // @ts-ignore TODO FIX
    return voteMappings[vote.optionId] === selectedVoteType;
  });

  return votesFilteredByOption;
};

const filterGovernanceAccounts = (accounts: (IVote | Delegate)[], voteSearch: string) => {
  //filter votes by search if search is present
  if (voteSearch) {
    return accounts.filter(vote => {
      const username = "TODO fillinusername";
      // const { username } = vote.communityProfile || {};
      const { voter } = vote as IVote;
      const { address } = vote as Delegate;

      return (
        (voter || address)?.toLowerCase().includes(voteSearch.toLowerCase()) ||
        //check communityProfile.username with a fuzzy search
        username?.toLowerCase()?.includes(voteSearch.toLowerCase()) ||
        levenshtein(username?.toLowerCase(), voteSearch) < (username?.length || 0) / 2
      );
    });
  }
  return accounts;
};

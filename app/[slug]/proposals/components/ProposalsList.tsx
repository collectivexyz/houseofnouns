"use client";
import { ProposalPreview } from "components/ProposalPreview";
import { IProposal } from "database/types";
import Fuse from "fuse.js";
import get from "lodash/get";
import { useState } from "react";
import { ScrollShadow } from "ui/atoms";
import Search from "ui/pixel-icons/Search";
import { ProposalsFilter, ProposalStatus } from "./ProposalsFilter";
import { ProposalsSorter, PROPOSAL_SORT_OPTIONS } from "./ProposalsSorter";

interface Props {
  proposals: IProposal[];
}

export function ProposalsList(props: Props) {
  const { proposals } = props;

  const [nameIncludes, setNameIncludes] = useState<string>("");
  const [proposalSort, setProposalSort] = useState<string>("Newest");
  const [proposalStatus, setProposalStatus] = useState<ProposalStatus>();

  const fuse = new Fuse(proposals, {
    threshold: 0.2,
    keys: [{ name: "title", weight: 3 }, { name: "profile.username", weight: 1.8 }, "description"],
    distance: 10000,
  });

  return (
    <div className="flex h-full flex-col lg:h-[calc(100%-32px)]">
      <div className="text-light-gray mb-2 flex flex-row items-center justify-between gap-2 xl:gap-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <Search width={16} height={16} />
          <input
            placeholder="Search"
            className="max-w-[80px] text-sm focus:outline-none"
            value={nameIncludes}
            onChange={e => {
              setNameIncludes(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row justify-end gap-2">
          <ProposalsSorter sort={proposalSort} setSorting={setProposalSort} />
          <ProposalsFilter status={proposalStatus} setStatus={setProposalStatus} />
        </div>
      </div>

      {/* 
      <div ref={proposalListRef} className="mt-2">
        {loading && proposalsCount === 0 && (
          <WidgetSkeleton count={INITIAL_PROPOSAL_COUNT} />
        )}

        {!loading && proposalsCount === 0 && (
          <Text as="subtext">No proposals found.</Text>
        )} */}

      {/* <div className="flex flex-row items-center justify-between p-2">
              <div>
                {hasNextPage && !loading && (
                  <div onClick={() => onViewMoreClick()}>
                    <Text
                      as="span"
                      className="cursor-pointer text-sm opacity-50 transition duration-100 hover:opacity-70"
                    >
                      View more +
                    </Text>
                  </div>
                )}
    
                {hasNextPage && loading && (
                  <Text as="span" className="text-sm opacity-70">
                    Loading...
                  </Text>
                )}
              </div>
    
              {proposalDocs?.totalDocs !== 0 && proposalsCount > 0 && (
                <span className="text-sm text-light-gray">
                  1-{proposalsCount} of {proposalDocs?.totalDocs}
                </span>
              )}
            </div> */}

      <ScrollShadow>
        {(nameIncludes ? fuse.search(nameIncludes).map(result => result.item) : proposals)
          .sort((a, b) => {
            if (nameIncludes) {
              return 0;
            }
            const sortValue = PROPOSAL_SORT_OPTIONS.find(
              option => option.label === proposalSort
            )?.value;
            const sortDirection = PROPOSAL_SORT_OPTIONS.find(
              option => option.label === proposalSort
            )?.sortDirection;

            const mapFunc =
              PROPOSAL_SORT_OPTIONS.find(option => option.label === proposalSort)?.mapFunc ||
              (x => x);

            // sort by that field
            if (!sortValue) {
              // @ts-ignore
              return mapFunc(b.creation.date) - mapFunc(a.creation.date);
            }
            return (mapFunc(get(b, sortValue)) - mapFunc(get(a, sortValue))) * sortDirection * -1;
          })
          .filter(proposal => {
            if (!proposalStatus) return true;
            return proposal.status === proposalStatus;
          })
          .map(proposal => (
            <ProposalPreview proposal={proposal} key={proposal.proposalId} />
          ))}
      </ScrollShadow>
    </div>
  );
}

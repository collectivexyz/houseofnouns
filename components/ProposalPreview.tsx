"use client";

import cx from "classnames";
import { IProposal } from "database/types";
import { shortenIfEthAddress } from "libs/utils/account";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { Avatar, Text } from "ui/atoms";
import Comment from "ui/pixel-icons/Comment";
import { StatusBadge } from "./StatusBadge";
import classNames from "classnames";
import { getVoteMappings } from "libs/governance";
import Check from "ui/pixel-icons/Check";

export interface TableOfContent {
  level: number;
  id?: string;
  name?: string;
}

interface Props {
  proposal: IProposal;
}

const removeTitle = (tableOfContent: TableOfContent[]) => {
  if (tableOfContent[0]?.level === 1) {
    return tableOfContent.slice(1);
  }

  return tableOfContent;
};

// returns current slug + /proposals/ + proposalId
const useProposalUrl = (proposalId: string | number) => {
  const pathname = usePathname();
  const slug = pathname.split("/")[1];
  return `/${slug}/proposals/${proposalId}`;
};

export const ProposalPreview = ({ proposal }: Props) => {
  const segment = useSelectedLayoutSegment();
  const isProposalSelected = segment === proposal.proposalId;
  const proposalUrl = useProposalUrl(proposal.proposalId);
  const proposalIdIsNumeric = !!(
    !Number.isNaN(parseFloat(proposal.proposalId)) && parseFloat(proposal.proposalId)
  );

  const myVoteMapping = proposal.myVote ? getVoteMappings("nouns")[proposal.myVote] : "";
  return (
    <div
      className={cx("mb-1 rounded-[12px]", {
        "bg-hon-gray": isProposalSelected,
      })}
    >
      <Link href={proposalUrl}>
        <div className="hover:bg-hon-gray flex cursor-pointer flex-col space-y-2 rounded-[12px] p-2 transition duration-100">
          <div className="flex flex-col items-baseline justify-between gap-1 lg:flex-row">
            <Text as="p" className="w-[300px] text-base">
              {proposalIdIsNumeric && (
                <span className="text-light-gray pr-1">{proposal.proposalId}</span>
              )}
              <span className="font-semibold">{proposal.title}</span>
            </Text>
          </div>
          <div className="flex items-center justify-between space-x-1">
            <div className="flex space-x-1.5">
              <Avatar
                id={proposal.proposer}
                imageUrl={proposal.profile?.profilePicture}
                size={20}
                borderRadius="lg"
              />
              <span className="max-w-fit truncate text-sm font-light opacity-60">
                {shortenIfEthAddress(proposal.profile?.username || proposal.proposer)}
              </span>
            </div>
            <span className="flex flex-row items-center gap-1 ">
              <StatusBadge status={proposal.status} showStatusText={isProposalSelected} />
              {proposal.myVote && (
                <div
                  className={classNames(
                    "flex h-[28px] flex-row items-center gap-1 rounded-[12px] px-2 text-xs text-white",
                    {
                      "bg-[#068940]": myVoteMapping === "For",
                      "bg-[#89898F]": myVoteMapping === "Abstain",
                      // "bg-[#FFB802]": status === "pending",
                      // "bg-[#807F7E]": status === "cancelled",
                      "bg-[#D22209]": myVoteMapping === "Against",
                      // "bg-[#2F80ED]": status === "queued",
                    }
                  )}
                >
                  <Check className="h-4 w-4" />
                  <span className="capitalize">{myVoteMapping}</span>
                </div>
              )}
            </span>
          </div>
        </div>
      </Link>

      {isProposalSelected && (
        <>
          {/* {tableOfContent.length !== 0 && (
            <>
              <hr className="mx-2 opacity-10" />
              <div
                className={cx("flex cursor-pointer items-center justify-between p-2", {
                  "rounded-b-[12px]": !isExpanded,
                })}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="flex items-center">
                  <List height={16} width={16} className="text-light-gray mr-1" />
                  <Text
                    as="span"
                    className="text-sm font-semibold opacity-60 transition duration-100 hover:opacity-100"
                  >
                    Table of Contents
                  </Text>
                </div>
                <ChevronDown
                  width={18}
                  height={18}
                  className={cx("transform transition duration-[250ms]", {
                    "rotate-180": isExpanded,
                  })}
                />
              </div>
              <Expandable isExpanded={isExpanded}>
                <div className="rounded-b-[12px] p-2 pt-0">
                  <ProposalTableOfContent tableOfContent={tableOfContent} />
                </div>
              </Expandable>
            </>
          )} */}
          <div className="cursor-pointer px-2 pb-2">
            <a href="#discussion" className="flex items-center">
              <Comment height={16} width={16} className="text-light-gray mr-1" />
              <Text
                as="p"
                className="text-sm font-semibold opacity-60 transition duration-100 hover:opacity-100"
              >
                Discussion
              </Text>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

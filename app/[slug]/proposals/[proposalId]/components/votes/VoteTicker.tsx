"use client";
import cx from "classnames";

// TODO move types to types repo or prisma
import {
  getPossibleVoteOptions,
  ProposalVoteCategory,
  VoteOption,
} from "libs/governance";
import { IVote } from "database/types";

interface Props {
  governanceType: string;
  options: any;
  selectedVoteType: string;
  setSelectedVoteType: (voteType: string) => void;
  votes: IVote[];
}

export const VoteTicker = ({
  governanceType,
  options,
  selectedVoteType,
  setSelectedVoteType,
  votes,
}: Props) => {
  // TODO load in via URL params
  // TODO can we abstract this into something reusable for client components?

  const possibleVoteOptions = getPossibleVoteOptions(
    governanceType as "nouns" | "snapshot"
  );
  // @ts-ignore
  const votesByCategory = calculateVotesByCategory(possibleVoteOptions, votes);

  const {
    For: forVotes,
    Against: againstVotes,
    Abstain: abstainVotes,
  } = votesByCategory;
  const totalVotes = forVotes + againstVotes + abstainVotes;
  const cutoffs = calculateCutoffs(
    forVotes,
    abstainVotes,
    againstVotes,
    totalVotes
  );

  return (
    <div className="flex w-full shrink-0 grow-0 flex-col px-4 lg:px-0">
      <div className="flex flex-row items-center overflow-hidden">
        {possibleVoteOptions.map((voteOption: VoteOption) => {
          const { color, name } = voteOption;
          const cutoff = cutoffs[name];

          if (cutoff !== 0) {
            return [...Array(cutoff)].map((e, i) => (
              <div
                className="flex-1 cursor-pointer px-[2px] py-[2px]"
                key={i}
                onClick={() =>
                  setSelectedVoteType(name === selectedVoteType ? "" : name)
                }
              >
                <div
                  className={cx(
                    `w-auto max-w-[4px] cursor-pointer rounded-[4px] transition duration-200`,
                    {
                      "h-[24px]": true,
                      "opacity-20":
                        selectedVoteType && selectedVoteType !== name,
                      "opacity-100":
                        !selectedVoteType || selectedVoteType === name,
                    }
                  )}
                  style={{ backgroundColor: color }}
                />
              </div>
            ));
          }

          return null;
        })}
      </div>
      <div className="flex flex-row justify-between">
        <div
          className={cx("flex cursor-pointer flex-col text-[#068940]", {
            "opacity-20":
              selectedVoteType && selectedVoteType !== ProposalVoteCategory.FOR,
            "opacity-100":
              !selectedVoteType ||
              selectedVoteType === ProposalVoteCategory.FOR,
          })}
          onClick={() =>
            setSelectedVoteType(
              selectedVoteType === ProposalVoteCategory.FOR
                ? ""
                : ProposalVoteCategory.FOR
            )
          }
        >
          <VotingScore label={ProposalVoteCategory.FOR} score={forVotes} />
        </div>
        <div
          className={cx(
            "flex cursor-pointer flex-col items-end text-[#D22209]",
            {
              "opacity-20":
                selectedVoteType &&
                selectedVoteType !== ProposalVoteCategory.AGAINST,
              "opacity-100":
                !selectedVoteType ||
                selectedVoteType === ProposalVoteCategory.AGAINST,
            }
          )}
          onClick={() =>
            setSelectedVoteType(
              selectedVoteType === ProposalVoteCategory.AGAINST
                ? ""
                : ProposalVoteCategory.AGAINST
            )
          }
        >
          <VotingScore
            label={ProposalVoteCategory.AGAINST}
            score={againstVotes}
          />
        </div>
      </div>
    </div>
  );
};

const safeCalculate = (value: number) => {
  return Number.isNaN(value) ? 0 : value;
};

const VotingScore = ({ label, score }) => (
  <>
    <span className="text-[24px] font-semibold">{score}</span>{" "}
    <span className="text-sm">{label}</span>
  </>
);

export const calculateVotesByCategory = (
  possibleVoteOptions: VoteOption[],
  votes: IVote[]
) => {
  const result = {
    [ProposalVoteCategory.FOR]: 0,
    [ProposalVoteCategory.AGAINST]: 0,
    [ProposalVoteCategory.ABSTAIN]: 0,
  };

  possibleVoteOptions
    .map((option) => option.name)
    .forEach((option) => {
      result[option] = 0;
    });

  // for each vote, add it to the result
  votes.forEach((vote) => {
    const { optionId, weight } = vote;
    const option = possibleVoteOptions.find(
      (option) => option.optionId === optionId
    );
    if (option) {
      result[option.name] += weight;
    }
  });

  return result;
};

const calculateCutoffs = (
  forVotes: number,
  abstainVotes: number,
  againstVotes: number,
  totalVotes: number
) => {
  const NUM_TICKS = 40;
  const cutoffs = {};

  cutoffs[ProposalVoteCategory.FOR] = safeCalculate(
    Math.floor((forVotes / totalVotes) * NUM_TICKS)
  );
  cutoffs[ProposalVoteCategory.ABSTAIN] = safeCalculate(
    Math.floor((abstainVotes / totalVotes) * NUM_TICKS)
  );
  cutoffs[ProposalVoteCategory.AGAINST] = safeCalculate(
    Math.floor((againstVotes / totalVotes) * NUM_TICKS)
  );

  if (
    cutoffs[ProposalVoteCategory.FOR] +
      cutoffs[ProposalVoteCategory.ABSTAIN] +
      cutoffs[ProposalVoteCategory.AGAINST] <
    NUM_TICKS
  ) {
    if (abstainVotes > 0 && cutoffs[ProposalVoteCategory.ABSTAIN] === 0) {
      cutoffs[ProposalVoteCategory.ABSTAIN] += 1;
    } else if (
      againstVotes > 0 &&
      cutoffs[ProposalVoteCategory.AGAINST] === 0
    ) {
      cutoffs[ProposalVoteCategory.AGAINST] += 1;
    } else {
      cutoffs[ProposalVoteCategory.ABSTAIN] += 1;
    }
  }

  return cutoffs;
};

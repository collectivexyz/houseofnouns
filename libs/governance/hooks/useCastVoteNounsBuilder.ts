"use client";

import { useContractWrite } from "wagmi";
import { CastVoteArgs } from ".";
import { NounsBuilderGovernorAbi } from "../../web3/abi/NounsBuilderAbi";

export const useCastVoteNounsBuilder = (config: any, args: CastVoteArgs): any => {
  const { governanceAddress } = config;

  const {
    data: dataCastVoteWithReason,
    write: writeCastVoteWithReason,
    isLoading: isLoadingCastVoteWithReason,
    error: errorCastVoteWithReason,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: governanceAddress,
    abi: NounsBuilderGovernorAbi,
    functionName: "castVoteWithReason",
    args: [args.proposalId, args.optionId, args.reason],
  });

  const {
    data: dataCastVoteWithoutReason,
    write: writeCastVoteWithoutReason,
    isLoading: isLoadingCastVoteWithoutReason,
    error: errorCastVoteWithoutReason,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: governanceAddress,
    abi: NounsBuilderGovernorAbi,
    functionName: "castVote",
    args: [args.proposalId, args.optionId],
  });

  if (args.reason) {
    return {
      isLoading: isLoadingCastVoteWithReason,
      castVote: () => {
        writeCastVoteWithReason();
      },
      data: dataCastVoteWithReason,
      error: errorCastVoteWithReason,
    };
  }
  return {
    isLoading: isLoadingCastVoteWithoutReason,
    castVote: () => {
      writeCastVoteWithoutReason();
    },
    data: dataCastVoteWithoutReason,
    error: errorCastVoteWithoutReason,
  };
};

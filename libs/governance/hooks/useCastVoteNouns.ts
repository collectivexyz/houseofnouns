"use client";

import { useContractWrite } from "wagmi";
import { CastVoteArgs } from ".";
import { NounsDaoAbi } from "../../web3/abi/NounsDaoAbi";

export const useCastVoteNouns = (config: any, args: CastVoteArgs): any => {
  const { governanceAddress } = config;

  const {
    data: dataCastVoteWithReason,
    write: writeCastVoteWithReason,
    isLoading: isLoadingCastVoteWithReason,
    error: errorCastVoteWithReason,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: governanceAddress,
    abi: NounsDaoAbi,
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
    abi: NounsDaoAbi,
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

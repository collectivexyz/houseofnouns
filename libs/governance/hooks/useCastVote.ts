"use client";

import { useCastVoteNouns } from "./useCastVoteNouns";
import { useCastVoteNounsBuilder } from "./useCastVoteNounsBuilder";
import { useCastVoteSnapshot } from "./useCastVoteSnapshot";

export interface CastVoteArgs {
  proposalId: string;
  optionId: string;
  reason?: string;
}

export interface VoteHookResponse {
  isLoading: boolean;
  data: CastVoteResponse | null;
  error: any;
  castVote: () => void;
}
export interface CastVoteResponse {
  hash: string;
}

export const useCastVote = (config: any, args: CastVoteArgs): VoteHookResponse => {
  console.log("Cast vote config and args: ", config, args);
  const { type } = config;
  const {
    castVote: castVoteNouns,
    data: dataNouns,
    isLoading: isLoadingNouns,
    error: errorNouns,
  } = useCastVoteNouns(config, args);
  const {
    castVote: castVoteSnapshot,
    data: dataSnapshot,
    isLoading: isLoadingSnapshot,
    error: errorSnapshot,
  } = useCastVoteSnapshot(config, args);

  const {
    castVote: castVoteNounsBuilder,
    data: dataNounsBuilder,
    isLoading: isLoadingNounsBuilder,
    error: errorNounsBuilder,
  } = useCastVoteNounsBuilder(config, args);

  if (type === "nouns") {
    return {
      data: dataNouns || null,
      castVote: castVoteNouns,
      isLoading: isLoadingNouns,
      error: errorNouns,
    };
  } else if (type === "nounsbuilder") {
    return {
      data: dataNounsBuilder || null,
      castVote: castVoteNounsBuilder,
      isLoading: isLoadingNounsBuilder,
      error: errorNounsBuilder,
    };
  } else if (type === "snapshot") {
    return {
      data: dataSnapshot || null,
      castVote: castVoteSnapshot,
      isLoading: isLoadingSnapshot,
      error: errorSnapshot,
    };
  } else {
    return {
      data: null,
      isLoading: false,
      castVote: () => {},
      error: null,
    };
  }
};

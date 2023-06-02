"use client";

// import snapshot from "@snapshot-labs/snapshot.js";
import { CastVoteArgs } from ".";
import { useState } from "react";
import { CastVoteResponse } from "./useCastVote";

// const client = new snapshot.Client712("https://hub.snapshot.org");

// TODO redo Snapshot voting
// TODO replace config with real type from prisma
export const useCastVoteSnapshot = (config: any, args: CastVoteArgs) => {
  // const { account, provider } = useUser();
  const [data, setData] = useState<CastVoteResponse>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // const writeCastVote = async () => {
  //   setLoading(true);
  //   client
  //     .vote(provider, account, {
  //       space: config.snapshotSpaceUrl.split("https://snapshot.org/#/")[1],
  //       proposal: args.proposalId,
  //       type: "single-choice",
  //       choice: Number(args.optionId),
  //       reason: args.reason,
  //       app: "house",
  //     })
  //     .then((res: any) => {
  //       // not sure if this is correct hash
  //       setData({ hash: res.id });
  //       setLoading(false);
  //       setError(null);
  //     })
  //     .catch(error => {
  //       setData(null);
  //       setLoading(false);
  //       setError(error);
  //     });
  // };

  return {
    castVote: () => {
      // writeCastVote();
    },
    data,
    error,
    isLoading: loading,
  };
};

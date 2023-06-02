import "server-only";

import { governance } from "../../";
import { cache } from "react";

export function Votes() {
  return Object.assign(governance.vote, {
    findForProposal,
  });
}

export const findForProposal = cache(async (proposalId: string, entityId: string) => {
  return await governance.vote.findMany({
    where: { proposalId, entityId },
    orderBy: { votedAt: { time: "desc" } },
    select: {
      profile: { select: { username: true, profilePicture: true } },
      proposalId: true,
      optionId: true,
      voter: true,
      votedAt: true,
      reason: true,
      weight: true,
    },
  });
});

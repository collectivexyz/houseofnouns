import "server-only";

import { cache } from "react";
import { governance, Paginated } from "../..";
import { IProposal } from "./IProposal";
import { transformProposal } from "./Proposal";

export function Proposals() {
  return Object.assign(governance.proposal, {
    findById,
    getLatestId,
  });
}

const findById = cache(async (proposalId: string, entityId: string): Promise<IProposal | null> => {
  const proposal = await governance.proposal.findFirst({
    where: { proposalId, entityId },
    include: { profile: { select: { profilePicture: true, username: true } } },
  });
  return proposal ? transformProposal(proposal) : null;
});

const getLatestId = cache(async (entityId: string): Promise<string | null> => {
  const proposal = await governance.proposal.findFirst({
    where: { entityId },
    select: { proposalId: true },
    orderBy: { creation: { block: "desc" } },
  });
  return proposal?.proposalId || null;
});

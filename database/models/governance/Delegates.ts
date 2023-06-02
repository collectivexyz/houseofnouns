import "server-only";

import { governance } from "../..";
import { cache } from "react";
import { Delegate, Profile } from "prisma-governance";

export function Delegates() {
  return Object.assign(governance.delegate, {
    getAbsenteesForProposal,
  });
}

const getAbsenteesForProposal = cache(
  async (
    entityId: string,
    proposalId: string
  ): Promise<(Delegate & { profile: Partial<Profile> })[] | null> => {
    const [voters, votes] = await Promise.all([
      governance.delegate.findMany({
        where: {
          entityId: {
            equals: entityId,
          },
          totalVotes: {
            gt: 0,
          },
        },
        orderBy: {
          totalVotes: "desc",
        },
        include: { profile: { select: { username: true, profilePicture: true, address: true } } },
        take: 250,
      }),
      governance.vote.findMany({
        where: {
          proposalId: {
            equals: proposalId,
          },
          entityId: {
            equals: entityId,
          },
        },
      }),
    ]);

    //return all voters who havent voted yet
    return voters.filter(voter => {
      return !votes.some(vote => vote.voter === voter.address);
    });
  }
);

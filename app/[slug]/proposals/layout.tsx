export const dynamic = "force-dynamic",
  revalidate = 0;

import { transformProposal } from "database/models/governance/Proposal";
import { transformCommunity } from "database/models/social/Community";
import { ICommunity, IProposal, IVote } from "database/types";
import { honApi, honApiStatic } from "libs/honApi";
import { serialize } from "libs/utils/data";
import { PropsWithChildren } from "react";
import ProposalsColumn from "./components/ProposalsColumn";
import wretch from "wretch";
import { getUser } from "libs/user/server";

type Props = PropsWithChildren<{ params: { slug: string } }>;

export default async function ProposalsLayout(props: Props) {
  const { slug } = props.params;

  const [{ data: community }, user] = await Promise.all([
    honApiStatic<ICommunity>(
      `daos/${slug}`,
      {},
      {
        transform: transformCommunity,
      }
    ),
    getUser(),
  ]);

  const entity = community.governanceEntityForStage("proposals");

  const [{ data: proposals }, { data: userVotes }] = await Promise.all([
    honApiStatic<IProposal[]>(
      `proposals`,
      {
        entityId: entity.entityId,
      },
      {
        cache: "no-store",
        revalidate: 300,
      }
    ),
    (async () => {
      if (user?.ethAddresses?.[0]) {
        return await honApiStatic<IVote[]>(
          `votes`,
          {
            entityId: entity.entityId,
            voter: user?.ethAddresses?.[0].toLowerCase(),
          },
          {
            cache: "no-store",
            revalidate: 0,
          }
        );
      } else {
        return { data: [] };
      }
    })(),
  ]);

  const serialized = serialize(proposals);

  userVotes?.forEach(vote => {
    const proposal = serialized.find(p => p.proposalId === vote.proposalId);
    if (proposal) {
      proposal.myVote = vote.optionId;
    }
  });

  return (
    <div className="grid w-full grid-cols-1 2xl:container lg:mx-auto lg:grid-cols-4 lg:gap-8 lg:overflow-hidden">
      <ProposalsColumn proposals={serialized} />
      {props.children}
    </div>
  );
}

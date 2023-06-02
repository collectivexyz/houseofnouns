export const dynamic = "force-dynamic";
export const dynamicParams = true;

import clsx from "classnames";
import { transformProposal } from "database/models/governance/Proposal";
import { transformCommunity } from "database/models/social/Community";
import { ICommunity, IProposal } from "database/types";
import { honApi, honApiStatic } from "libs/honApi";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProposalBody } from "./components/proposal/ProposalBody";
import ProposalBodySkeleton from "./components/proposal/ProposalBodySkeleton";
import { IProposalTab, ProposalMobileMenu } from "./components/proposal/ProposalMobileMenu";
import { VotingView } from "./components/votes/VotingView";
import { VotingViewSkeleton } from "./components/votes/VotingViewSkeleton";
import { getAllDaoSlugs } from "utils/getAllDaoSlugs";
import { Proposals } from "database/models/governance/Proposals";

interface PageProps {
  params: {
    slug: string;
    proposalId: string;
  };
  searchParams: {
    tab?: IProposalTab;
    voteType?: string;
  };
}

export default async function ProposalPage({ params, searchParams }: PageProps) {
  const { slug, proposalId } = params;
  const { tab = "proposal", voteType = "" } = searchParams;

  if (!proposalId) return;

  const { data: community } = await honApiStatic<ICommunity>(
    `daos/${slug}`,
    {},
    {
      transform: transformCommunity,
    }
  );
  const entity = community.governanceEntityForStage("proposals");

  const proposal = await honApiStatic<IProposal>(`proposals/${proposalId}`, {
    entityId: entity.entityId,
  },
    {
      cache: "no-store",
    }
  ).then(res => {
    return transformProposal(res.data);
  });

  if (!proposal) {
    console.error("Proposal not found", { params, searchParams });
    notFound();
  }

  return (
    <>
      <ProposalMobileMenu slug={slug} governanceType={"proposals"} />

      <div
        className={clsx(
          "lg:h-body lg:hide-scrollbar px-2 py-4 lg:col-span-2 lg:block lg:overflow-y-auto lg:px-0 lg:py-8",
          {
            hidden: tab === "voting",
          }
        )}
      >
        <Suspense fallback={<ProposalBodySkeleton />}>
          {/* @ts-expect-error Server Component */}
          <ProposalBody proposal={proposal} tab={tab} />
        </Suspense>
      </div>

      <div
        className={clsx("lg:h-body px-2 pt-8 lg:block lg:pl-0 lg:pr-2.5", {
          hidden: tab !== "voting",
        })}
      >
        <Suspense fallback={<VotingViewSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <VotingView proposal={proposal} selectedVoteType={voteType} />
        </Suspense>
      </div>
    </>
  );
}

// export async function generateStaticParams() {
//   const daos = await getAllDaoSlugs();
//   const params = await Promise.all(
//     daos?.map(async dao => {
//       const slug = dao.slug;
//       const { data: community } = await honApiStatic<ICommunity>(
//         `daos/${slug}`,
//         {},
//         {
//           transform: transformCommunity,
//         }
//       );
//       const entity = community.governanceEntityForStage("proposals");
//       const proposal = await Proposals().findFirst({
//         where: { entityId: entity.entityId },
//         orderBy: { proposalId: "desc" },
//       });
//       if (!proposal) return;

//       // check if it can be safely cast to an int, otherwise return
//       const proposalIdIsNumeric = !!(
//         !Number.isNaN(parseInt(proposal.proposalId)) && parseInt(proposal.proposalId)
//       );

//       if (!proposalIdIsNumeric || parseInt(proposal.proposalId) > 5000) return;

//       // return an array of the dao slug + each proposalId from 0 to the highest proposalId, if the proposalId is a regular int
//       console.log("Making array up to ", parseInt(proposal.proposalId));
//       return Array.from(Array(parseInt(proposal.proposalId)).keys()).map(proposalId => {
//         return {
//           params: {
//             slug: slug,
//             proposalId: proposalId.toString(),
//           },
//         };
//       });
//     })
//   );
//   // fuse the params together into flattened list
//   console.log("Params.flat(): ", params.flat());
//   return params.flat();
// }

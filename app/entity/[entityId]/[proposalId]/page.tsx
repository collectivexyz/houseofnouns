import { ICommunity } from "database/types";
import { honApi, honApiStatic } from "libs/honApi";
import { redirect } from "next/navigation";

export default async function RedirectToProposalPage({ params }) {
  const { proposalId, entityId } = params;
  const { data: community } = await honApiStatic<ICommunity>("daos/entity/" + entityId, {});

  redirect(`/${community?.slug}/proposals/${proposalId}`);
}

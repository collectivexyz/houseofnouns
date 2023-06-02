export const revalidate = 60 * 60;

import { honApiStatic } from "libs/honApi";
import { redirect } from "next/navigation";
import { getAllDaoSlugs } from "utils/getAllDaoSlugs";
import IndexRedirect from "./components/IndexRedirect";

interface Props {
  params: {
    slug: string;
  };
  searchParams: {
    isDesktop?: boolean;
  };
}

export default async function HouseIndex({ params, searchParams }: Props) {
  const { slug } = params;
  const { isDesktop } = searchParams;

  const { data: proposalId } = await honApiStatic<string>(
    "proposals/latest",
    { slug },
    { revalidate: 60 * 60 }
  );

  if (typeof isDesktop !== undefined && proposalId) {
    redirect(`/${slug}/proposals/${proposalId}`);
  }

  return <IndexRedirect recentProposalId={proposalId} />;
}

export async function generateStaticParams() {
  return getAllDaoSlugs();
}

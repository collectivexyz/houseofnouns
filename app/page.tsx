export const revalidate = 600; // 10 minutes

import { PageProps } from ".next/types/app/page";
import { serializeSync } from "database";
import { transformCommunity } from "database/models/social/Community";
import { ICommunity } from "database/types";
import { honApi, honApiStatic } from "libs/honApi";
import { Metadata } from "next";
import { PropsWithChildren, Suspense } from "react";
import { getPaletteStyle } from "utils/palette";
import HomepageView from "./components/HomepageView";
import Header from "./[slug]/components/Header";

export async function generateMetadata({
  params,
}: PropsWithChildren<PageProps>): Promise<Metadata> {
  return {
    title: `House of Nouns`,
    description: `View Nounish DAO proposals, discussion, and analytics on House of Nouns. Hosted by collective.xyz.`,
  };
}

export default async function Page() {
  const communities = (await honApiStatic<ICommunity[]>("daos", { sort: "proposalCount" })).data
    .map(res => transformCommunity(res))
    .map(serializeSync)
    .sort((a, b) => (a.name == "Nouns" ? -1 : 1));

  const nounsPalette = communities.find(c => c.slug === "nouns").aesthetics.palette;

  const paletteStyle = getPaletteStyle(nounsPalette);

  return (
    <div style={paletteStyle}>
      <Suspense fallback="">
        <Header options={communities} />
      </Suspense>
      {/* @ts-expect-error Server Component */}
      <HomepageView options={communities} />
    </div>
  );
}

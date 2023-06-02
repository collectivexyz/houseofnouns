import { serializeSync } from "database";
import { transformCommunity } from "database/models/social/Community";
import { ICommunity } from "database/types";
import { honApiStatic } from "libs/honApi";

import { Metadata } from "next";
import { PropsWithChildren, Suspense } from "react";
import { Notifications } from "ui/organisms";
import { getPaletteStyle } from "utils/palette";
import Header from "./components/Header";
import { TreasuryBalance } from "./components/TreasuryBalance";
interface PageParams {
  slug: string;
}

interface PageProps {
  params?: PageParams;
}

export async function generateMetadata({
  params,
}: PropsWithChildren<PageProps>): Promise<Metadata> {
  const { data: community } = await honApiStatic<ICommunity>(
    `daos/${params?.slug}`,
    {},
    {
      transform: transformCommunity,
    }
  );
  if (!community) return null;

  return {
    title: `House of ${community.name}`,
    description: `View ${community.name} DAO proposals, discussion, and analytics on House of ${community.name}. Hosted by collective.xyz.`,
    themeColor: community?.aesthetics?.palette?.darkPrimary || undefined,
  };
}

export default async function HouseLayout(props: PropsWithChildren<PageProps>) {
  const { children, params } = props;
  const { slug } = params || {};

  const communities = (await honApiStatic<ICommunity[]>("daos", { sort: "proposalCount" })).data
    .map(res => transformCommunity(res))
    .map(serializeSync);

  const community = communities.find(c => c.slug === slug);

  const nounsPalette = communities.find(c => c.slug === "nouns").aesthetics.palette;

  const paletteStyle = getPaletteStyle(community.aesthetics.palette || nounsPalette);

  return (
    <div style={paletteStyle} className="flex flex-col lg:h-screen">
      <Notifications />
      <Suspense fallback="">
        <Header
          options={communities}
          selected={community}
          treasury={
            <Suspense fallback="">
              {/* @ts-expect-error Server Component */}
              <TreasuryBalance treasuryAddress={community.treasuryAddress} />
            </Suspense>
          }
        />
      </Suspense>
      {children}
    </div>
  );
}

import { transformCommunity } from "database/models/social/Community";
import { ICommunity } from "database/types";
import { honApi, honApiStatic } from "libs/honApi";
import { SettingsView } from "./SettingsView";

export default async function Settings({ params }) {
  // load governance settings from Prisma
  const { data: community } = await honApiStatic<ICommunity>(
    `daos/${params.slug}`,
    {},
    {
      transform: transformCommunity,
    }
  );

  return (
    <SettingsView
      initialGovernanceSettings={community?.governanceSettings}
      initialAesthetics={community?.aesthetics}
      slug={params?.slug}
    />
  );
}

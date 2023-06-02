import "server-only";

import { CommunityProfile, Profile, ProfileLink } from "prisma-social";
import { cache } from "react";
import { shortenIfEthAddress } from "../../../libs/utils/account";
import { ICommunityProfile } from "./ICommunityProfile";
import { Links } from "./Links";

export type CommunityProfileFull = CommunityProfile & {
  profile?: Pick<Profile, "username" | "profilePicture"> | null;
};

export function transformCommunityProfile(
  communityProfile: CommunityProfileFull
): ICommunityProfile {
  return Object.assign(communityProfile, {
    username: getUsername(communityProfile),
    profilePicture: communityProfile.profile?.profilePicture || communityProfile.profilePicture,
    displayName: communityProfile.displayName || getUsername(communityProfile),

    getLinks: async () => getLinks(communityProfile.links || []),
  });
}

const getUsername = (communityProfile: CommunityProfileFull) => {
  return shortenIfEthAddress(
    communityProfile.profile?.username || communityProfile.username || communityProfile.address
  );
};

export const getLinks = cache(async (links: ProfileLink[]) => {
  return await Promise.all(
    links.map(async ({ url, title }) => {
      const linkData = await Links().get(url);
      return {
        url,
        title: title || linkData?.title || url,
        imageUrl: linkData?.imageUrl || undefined,
      };
    })
  );
});

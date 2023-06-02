import "server-only";

import { cache } from "react";
import { social } from "../..";
import { IVisionariesOrderBy } from "../../types/filters/VisionariesFilters";
import { transformCommunityProfile } from "./CommunityProfile";
import { ICommunityProfile } from "./ICommunityProfile";
import { Profiles } from "./Profiles";
import { getVisionariesFilterEmpty, getVisionariesOrderBy } from "./utils/filter";

export function CommunityProfiles() {
  return Object.assign(social.communityProfile, {
    get,
    getMany,
    getVisionaries,
    getByUsername,
  });
}

const get = cache(async (address: string, communitySlug: string) => {
  const profile = await social.communityProfile.findFirst({
    where: { address: address.toLowerCase(), communitySlug },
    include: {
      profile: { select: { profilePicture: true, username: true } },
    },
  });

  return profile ? transformCommunityProfile(profile) : null;
});

const getMany = cache(async (addresses: string[], communitySlug: string) => {
  const profiles = await social.communityProfile.findMany({
    where: {
      communitySlug,
      address: { in: addresses.map(a => a.toLowerCase()) },
    },
    include: {
      profile: { select: { profilePicture: true, username: true } },
    },
  });

  return profiles.map(transformCommunityProfile);
});

const getVisionaries = cache(
  async (
    revolutionId: string,
    page: number,
    take: number,
    orderBy: IVisionariesOrderBy = "totalEarned",
    username?: string
  ) => {
    const sortBy = getVisionariesOrderBy(orderBy);
    const filterEmpty = getVisionariesFilterEmpty(orderBy);

    const profiles = await social.communityProfile.findMany({
      where: {
        communitySlug: revolutionId,
        ...filterEmpty,
        ...(username ? { username: { contains: username, mode: "insensitive" } } : {}),
      },
      orderBy: [...sortBy, { address: "asc" }],
      take,
      skip: page * take,
      include: { profile: { select: { username: true, profilePicture: true } } },
    });

    const transformed = profiles?.map(transformCommunityProfile) || [];

    return transformed.filter((post): post is ICommunityProfile => post !== null);
  }
);

const getByUsername = cache(async (username: string, revolutionId: string) => {
  const user = await Profiles().getByUsername(username);

  if (!user || !user.address) return null;

  const profile = await CommunityProfiles().get(user.address, revolutionId);

  return profile;
});

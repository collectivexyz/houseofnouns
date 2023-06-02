import { cache } from "react";
import { social } from "../..";
import { updateProfilePicture, updateUsername } from "./set/editProfile";

export function Profiles() {
  return Object.assign(social.profile, {
    get,
    getByUsername,
    getMany,
    updateProfilePicture,
    updateUsername,
  });
}

const get = cache(async (address: string) => {
  return await social.profile.findFirst({ where: { address: address.toLowerCase() } });
});

const getByUsername = cache(async (username: string) => {
  return await social.profile.findFirst({ where: { username } });
});

const getMany = cache(async (addresses: string[]) => {
  return await social.profile.findMany({
    where: { address: { in: addresses.map(a => a.toLowerCase()) } },
    select: { profilePicture: true, username: true, address: true },
  });
});

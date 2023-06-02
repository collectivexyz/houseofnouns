import { Profile } from "prisma-social";

const getShortEthAddress = (address?: string): string =>
  address && address?.length > 10
    ? `${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`
    : "";

const isEthAddress = (text?: string): boolean => /^(0x){1}[0-9a-fA-F]{40}$/i.test(text || "");

const shortenIfEthAddress = (username = "") =>
  isEthAddress(username) ? getShortEthAddress(username) : username;

export const getProfileMarkdownLink = (profile: Profile) => {
  return `[${shortenIfEthAddress(profile.username)}](/user/${profile.address})`;
};

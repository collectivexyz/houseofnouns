import { getShortEthAddress, isEthAddress } from "./eth";
import { truncateString } from "../../text";

/**
 * Helper that returns a shortened username string
 *
 * @param {string} username
 * @returns {string}
 */
export const getShortenedUsername = (username: string) =>
  isEthAddress(username)
    ? getShortEthAddress(username)
    : truncateString(username, 15);

/**
 * Helper that returns a shortened username only if ethAddress
 *
 * @param {string} username
 * @returns {string}
 */
export const shortenIfEthAddress = (username = "") =>
  isEthAddress(username) ? getShortEthAddress(username) : username;

export const normalizeEthAddress = (address?: string) => {
  if (!address) return null;
  if (isEthAddress(address)) return address.toLowerCase();
  if (isEthAddress(`0x${address}`)) return `0x${address}`.toLowerCase();
  return null;
};

const accountMethods = {
  getShortenedUsername,
  shortenIfEthAddress,
  normalizeEthAddress,
};

export default accountMethods;

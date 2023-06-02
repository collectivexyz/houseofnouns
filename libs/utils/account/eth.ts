import { INetwork } from "types";

/**
 * Eth address shortening helper method
 * @param {string} address
 * @returns {string} shortened eth address
 */
export const getShortEthAddress = (address?: string): string =>
  address && address?.length > 10
    ? `${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`
    : "";

/**
 * Eth transaction URL on etherscan generator method
 * @param {string} transaction
 * @returns {string} ethscan URL
 */
export const etherscanUrl = (transaction: string): string =>
  `https://etherscan.io/tx/${transaction}`;

/**
 * Eth transaction URL on etherscan generator method
 * @param {string} transaction
 * @param {string} network
 * @returns {string} etherscan URL of different networks
 */
export const etherscanNetworkUrl = (
  transaction: string,
  network: INetwork
): string => {
  if (network === "mainnet") {
    return etherscanUrl(transaction);
  }
  if (network === "polygon") {
    return `https://polygonscan.com/tx/${transaction}`;
  }
  return `https://${network}.etherscan.io/tx/${transaction}`;
};

/**
 * Eth transaction URL on etherscan generator method
 * @param {string} transaction
 * @param {string} network
 * @returns {string} etherscan URL of different networks
 */
export const etherscanNetworkUrlByChainId = (
  transactionId: string,
  chainId: number
): string => {
  if (chainId === 1) {
    return etherscanUrl(transactionId);
  }
  if (chainId === 137) {
    return `https://polygonscan.com/tx/${transactionId}`;
  }
  return `https://goerli.etherscan.io/tx/${transactionId}`;
};

/**
 * Validates string is eth address
 * @param {string} text
 * @returns {boolean}
 */
export const isEthAddress = (text?: string): boolean =>
  /^(0x){1}[0-9a-fA-F]{40}$/i.test(text || "");

/**
 * Validates string is ENS name (domain)
 */
export const isEnsName = (text: string): boolean =>
  /^[a-z0-9-]+\.(eth|test)$/i.test(text);

const ethMethods = {
  etherscanUrl,
  getShortEthAddress,
  isEthAddress,
  isEnsName,
};

export default ethMethods;

import { BigNumber, ethers } from "ethers";
import { INetwork } from "types";
import {
  arbitrum,
  baseGoerli,
  goerli,
  mainnet,
  optimism,
  polygon,
  sepolia,
  polygonMumbai,
} from "viem/chains";

export const weiToEth = (weiAmount: string | number) =>
  weiAmount ? parseInt(`${weiAmount}`, 10) / 1e18 : null;

export const bigNumberToDate = (bigNum: BigNumber): Date => {
  if (!bigNum) return new Date(0);
  const bigIntValue = bigNum.toBigInt();
  return new Date(Number(bigIntValue) * 1000);
};

export const bigNumberWeiToEth = (bigNumber: number | BigNumber): string => {
  return ethers.utils.formatEther(bigNumber);
};

export function convertIpfsUrl(url: string) {
  return url.replace("ipfs://", "https://thatsgnarly.mypinata.cloud/ipfs/");
}

export function getChainId(network: INetwork) {
  switch (network) {
    case "mainnet":
      return mainnet.id;
    case "goerli":
      return goerli.id;
    case "sepolia":
      return sepolia.id;
    case "optimism":
      return optimism.id;
    case "arbitrum":
      return arbitrum.id;
    case "polygon":
      return polygon.id;
    case "mumbai":
      return polygonMumbai.id;
    case "baseGoerli":
      return baseGoerli.id;
  }
}

export function hexToAddress(hex: string): string {
  if (hex.length == 42) {
    return hex.toLowerCase();
  }
  return ethers.utils.getAddress(ethers.utils.hexDataSlice(hex, 12)).toLowerCase();
}

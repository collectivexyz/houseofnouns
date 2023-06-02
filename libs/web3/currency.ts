import { Currency } from "types";
import { mainnet, polygon } from "viem/chains";

export function getCurrencyFromChainId(chainId?: number) {
  switch (chainId) {
    case mainnet.id:
      return Currency.ETH;
    case polygon.id:
      return Currency.MATIC;
    default:
      return Currency.ETH;
  }
}

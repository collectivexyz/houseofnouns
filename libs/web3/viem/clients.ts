import { INetwork } from "types";
import { createPublicClient, http, PublicClient } from "viem";
import { goerli, mainnet, polygon, polygonMumbai } from "viem/chains";

export const mainnetClient: PublicClient = createPublicClient({
  chain: mainnet,
  transport: http(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`),
  batch: {
    multicall: true,
  },
});

export const goerliClient: PublicClient = createPublicClient({
  chain: goerli,
  // transport: http(`https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`),
  transport: http(`https://goerli.infura.io/v3/7f593255dbfe4da9b4c879a3c9392575`),
  batch: {
    multicall: true,
  },
});

export const polygonClient: PublicClient = createPublicClient({
  chain: polygon,
  transport: http(`https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`),
  batch: {
    multicall: true,
  },
});

export const mumbaiClient: PublicClient = createPublicClient({
  chain: polygonMumbai,
  // transport: http(`https://polygon-mumbai.infura.io/v3/${process.env.INFURA_PROJECT_ID}`),
  transport: http(`https://polygon-mumbai.infura.io/v3/7f593255dbfe4da9b4c879a3c9392575`),
  batch: {
    multicall: true,
  },
});

export function getClient(network: INetwork): PublicClient {
  switch (network) {
    case "mainnet":
      return mainnetClient;
    case "goerli":
      return goerliClient;
    case "polygon":
      return polygonClient;
    case "mumbai":
      return mumbaiClient;
    default:
      throw new Error(`Network Client not available: ${network}`);
  }
}

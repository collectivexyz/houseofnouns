import { cache } from "react";
import { eth } from "../../..";

export function Nfts() {
  return Object.assign(eth.nft, {
    getOwnership,
  });
}

export const getOwnership = cache(
  async (owner: string, networkAdresses: string[]) => {
    const nfts = await eth.nft.findMany({
      where: {
        owner: owner.toLowerCase(),
        networkAddress: { in: networkAdresses },
      },
      select: { networkAddress: true, tokenId: true },
    });

    return networkAdresses.map((networkAddress) => ({
      networkAddress,
      ownedCount:
        nfts.filter((nft) => nft.networkAddress === networkAddress)?.length ||
        0,
    }));
  }
);

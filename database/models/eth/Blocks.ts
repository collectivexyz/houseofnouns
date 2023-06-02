import { eth } from "../../";
import { cache } from "react";

export const getLatestBlockNumber = cache(async (chainId = 1): Promise<number> => {
  const latest = await eth.block.findFirst({ where: { chainId }, orderBy: { blockNumber: "desc" } });

  if (!latest) throw new Error("No blocks found");

  return latest.blockNumber;
});

export function Blocks() {
  return Object.assign(eth.block, {
    getLatestBlockNumber,
  });
}

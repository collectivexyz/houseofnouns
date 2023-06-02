import { ethers } from "ethers";

export const provider = new ethers.providers.InfuraProvider(
  undefined,
  process.env.INFURA_PROJECT_ID
);

export const goerliProvider = new ethers.providers.InfuraProvider(5, process.env.INFURA_PROJECT_ID);

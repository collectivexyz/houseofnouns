const Network = {
  goerli: "goerli",
  mainnet: "mainnet",
  sepolia: "sepolia",
  polygon: "polygon",
  optimism: "optimism",
  arbitrum: "arbitrum",
  baseGoerli: "baseGoerli",
  mumbai: "mumbai",
};

export type INetwork = (typeof Network)[keyof typeof Network];

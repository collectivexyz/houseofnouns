import { BigNumber, ethers } from "ethers";
import { cache } from "react";
import { INetwork } from "types";
import { ERC721DropAbi } from "./abis/ERC721DropAbi";
import { bigNumberToDate, bigNumberWeiToEth } from "./utils";
import { formatUnits } from "viem";
import { ERC1155DropAbi } from "./abis/ERC1155DropAbi";
import { ERC1155TokenAbi } from "./abis/ERC1155TokenAbi";
import { ThirdwebERC721DropAbi } from "./abis/ThirdwebERC721DropAbi";
import { EditionDetails } from "prisma-revolution";
import { getRevolutionTokenDataFromContract } from "./revolution/revolutionDropData";

const MAX_MINTS_PER_ADDRESS = 4294967295;

export interface EditionContractDetails {
  maxSalePurchasePerAddress: number;
  salePriceEth: string;
  saleStart: number;
  saleEnd: number;
  presaleStart: number;
  presaleEnd: number;
  isMintingOpen: boolean;
  isMintingOver: boolean;
  totalSupply: string;
  totalMinted: number;
  saleProceedsEth: number;
}

export interface EditionContractDataRaw {
  maxSalePurchasePerAddress: number;
  publicSaleStart: BigNumber;
  publicSaleEnd: BigNumber;
  presaleStart: BigNumber;
  presaleEnd: BigNumber;
  publicSalePrice: number;
}

export interface EditionERC1155ContractDataRaw {
  dropEndTime: BigNumber;
  dropPrice: BigNumber;
  creator: string;
  totalValuePurchased: BigNumber;
}

const getEditionDetailsFromContractRaw = (contractDataRaw: EditionContractDataRaw) => {
  const saleStart = bigNumberToDate(contractDataRaw?.publicSaleStart);
  const saleEnd = bigNumberToDate(contractDataRaw?.publicSaleEnd);
  const presaleStart = bigNumberToDate(contractDataRaw?.presaleStart);
  const presaleEnd = bigNumberToDate(contractDataRaw?.presaleEnd);
  const salePriceEth =
    contractDataRaw?.publicSalePrice && bigNumberWeiToEth(contractDataRaw?.publicSalePrice);

  const isMintingOver = saleEnd && new Date() > saleEnd;
  const isMintingOpen = saleStart && new Date() > saleStart && !isMintingOver;

  const details = {
    maxSalePurchasePerAddress: contractDataRaw?.maxSalePurchasePerAddress || 0,
    salePriceEth: salePriceEth || "0",
    saleStart: saleStart?.getTime(),
    saleEnd: saleEnd?.getTime(),
    presaleStart: presaleStart?.getTime(),
    presaleEnd: presaleEnd?.getTime(),
    isMintingOpen,
    isMintingOver,
  };
  return details;
};

export const infuraProvider = new ethers.providers.InfuraProvider(
  "mainnet",
  process.env.INFURA_PROJECT_ID
);

export const infuraGoerliProvider = new ethers.providers.InfuraProvider(
  "goerli",
  process.env.INFURA_PROJECT_ID
);

export const infuraPolygonProvider = new ethers.providers.InfuraProvider(
  "matic",
  process.env.INFURA_PROJECT_ID
);

export const infuraMumbaiProvider = new ethers.providers.InfuraProvider(
  "maticmum",
  process.env.INFURA_PROJECT_ID
);

export const getDropContract = (
  address: string,
  network: INetwork = "mainnet",
  contractType: "ERC1155" | "ERC721" | "ThirdwebERC721" = "ERC721"
) => {
  const contractTypeToAbi = {
    ERC1155: ERC1155DropAbi,
    ERC721: ERC721DropAbi,
    ThirdwebERC721: ThirdwebERC721DropAbi,
  };

  const networkToInfuraProvider = {
    mainnet: infuraProvider,
    goerli: infuraGoerliProvider,
    polygon: infuraPolygonProvider,
    mumbai: infuraMumbaiProvider,
    sepolia: undefined,
    optimism: undefined,
    arbitrum: undefined,
    baseGoerli: undefined,
  };

  return new ethers.Contract(
    address,
    contractTypeToAbi[contractType],
    networkToInfuraProvider[network]
  );
};

export const getEditionContractDetails = async (
  dropId: string,
  address: string,
  network: INetwork = "mainnet",
  tokenAddress: string | null = null,
  tokenId: number | null = null,
  editionDetails: EditionDetails | null = null
): Promise<EditionContractDetails | null> => {
  try {
    if (dropId === "revolution-drop") {
      if (tokenAddress === null || tokenId === null) {
        throw new Error("Token address and token id must be provided for ERC1155 drop");
      }
      const details = await getRevolutionTokenDataFromContract(
        address as `0x${string}`,
        tokenAddress as `0x${string}`,
        network,
        tokenId
      );
      if (!details) return null;

      return {
        ...details,
        saleStart: details.saleStart.getTime(),
        saleEnd: details.saleEnd.getTime(),
        presaleEnd: details.presaleEnd.getTime(),
        presaleStart: details.presaleStart.getTime(),
      };
    } else if (dropId === "thirdweb-init-mint") {
      return getEditionContractDetailtsThirdwebERC721(address, network, editionDetails);
    } else {
      return getEditionContractDetailsERC721(address, network);
    }
  } catch (e) {
    console.error("Error loading edition details", e);
    return null;
  }
};

export const getEditionContractDetailsERC721 = cache(
  async (
    address: string,
    network: INetwork = "mainnet"
  ): Promise<EditionContractDetails | null> => {
    try {
      const dropContract = getDropContract(address, network);

      const [saleInfo, totalSupplyRaw] = await Promise.all([
        dropContract.salesConfig(),
        dropContract.totalSupply(),
      ]);

      const details = getEditionDetailsFromContractRaw(saleInfo);

      const totalSupply = formatUnits(totalSupplyRaw as unknown as bigint, 0);
      const totalMinted = parseInt(totalSupply);

      const saleProceedsEth = parseFloat(details.salePriceEth) * totalMinted;

      return { ...details, totalSupply, totalMinted, saleProceedsEth };
    } catch (e) {
      console.error("Error loading edition details", e);
      return null;
    }
  }
);

export const getTokenContract = (dropContractAddress: string, network: INetwork = "mainnet") => {
  return new ethers.Contract(
    dropContractAddress,
    ERC1155TokenAbi,
    network === "mainnet" ? infuraProvider : infuraGoerliProvider
  );
};

const getEditionDetailsFromERC1155ContractRaw = (
  contractDataRaw: EditionERC1155ContractDataRaw
) => {
  const dropEndTime = bigNumberToDate(contractDataRaw?.dropEndTime);
  const dropPrice = bigNumberWeiToEth(contractDataRaw?.dropPrice);

  const isMintingOver = dropEndTime && new Date() > dropEndTime;
  const isMintingOpen = !isMintingOver;

  const details = {
    maxSalePurchasePerAddress: MAX_MINTS_PER_ADDRESS,
    salePriceEth: dropPrice || "0",
    saleStart: 0,
    saleEnd: dropEndTime?.getTime(),
    presaleStart: 0,
    presaleEnd: 0,
    isMintingOpen,
    isMintingOver,
  };
  return details;
};

// For the Thirdweb contracts we hardcode most of the info in the EditionDetails before launch
// This is because they are open editions based on number of mints vs time as the Zora contracts are
export const getEditionContractDetailtsThirdwebERC721 = cache(
  async (
    address: string,
    network: INetwork = "mainnet",
    details: EditionDetails | null = null
  ): Promise<EditionContractDetails | null> => {
    if (!details || !address) {
      return null;
    }

    const dropContract = getDropContract(address, network, "ThirdwebERC721");
    const totalSupplyRaw = await dropContract.totalSupply();
    const totalSupply = formatUnits(totalSupplyRaw as unknown as bigint, 0);

    const totalMinted = parseInt(totalSupply);
    const saleProceedsEth = parseFloat(details.salePriceEth) * totalMinted;

    const saleStart = details.saleStart;
    const saleEnd = details.saleEnd;
    const currentTime = new Date();

    const isMintingOver = saleEnd ? currentTime > saleEnd : false;
    const isMintingOpen = saleStart ? currentTime > saleStart && !isMintingOver : false;

    return {
      salePriceEth: details.salePriceEth,
      saleStart: saleStart?.getTime() || 0,
      saleEnd: saleEnd?.getTime() || 0,
      presaleStart: details.presaleStart?.getTime() || 0,
      presaleEnd: details.presaleEnd?.getTime() || 0,
      isMintingOpen,
      isMintingOver,
      maxSalePurchasePerAddress: details.maxSalePurchasePerAddress || MAX_MINTS_PER_ADDRESS,
      totalSupply,
      totalMinted,
      saleProceedsEth,
    };
  }
);

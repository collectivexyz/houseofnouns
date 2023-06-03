import { Contract } from "@ethersproject/contracts";
import { ethers, utils } from "ethers";
import { erc20ABI } from "@wagmi/core";

const erc20Interface = new utils.Interface(erc20ABI);

const getProvider = (chainId: number) =>
  new ethers.providers.InfuraProvider(chainId, process.env.INFURA_PROJECT_ID);

function getContracts(addresses: string[], chainId: number): Contract[] {
  const provider = getProvider(chainId);
  return addresses.map(
    (address) => new Contract(address, erc20Interface, provider)
  );
}

async function getAddressBalance(
  address: string,
  chainId: number
): Promise<number> {
  const provider = getProvider(chainId);
  const balance = await provider.getBalance(address);
  return parseFloat(ethers.utils.formatEther(balance));
}

async function getContractsBalance(
  contracts: Contract[],
  address: string
): Promise<number> {
  if (contracts.length === 0) return 0;
  const promises: Array<Promise<any>> = [];
  contracts.forEach((contract) => promises.push(contract.balanceOf(address)));
  const balances = await Promise.all(promises);
  return balances.reduce((a, b) => a + b, 0) / 1e18;
}

export async function getTotalBalance(
  address: string,
  tokens: string[] = [],
  chainId = 1
): Promise<number> {
  try {
    const addressBalance = await getAddressBalance(address, chainId);
    const contractsBalance = await getContractsBalance(
      getContracts(tokens, chainId),
      address
    );
    return addressBalance + contractsBalance;
  } catch (e) {
    console.error("Error loading treasury", e);
    return 0;
  }
}

import { BigNumber, ethers } from "ethers";

const USDC_CONTRACT = "0xd97bcd9f47cee35c0a9ec1dc40c1269afc9e8e1d";

//converts raw signature from gov db to [ "uint[]", "string" ] format
const getAbiArgsStringFromSignature = (signature: string) => {
  const abiArgs = signature.split("(")[1].split(")")[0].split(",");
  return abiArgs.map((arg) => `${arg}`);
};

const getCalldataDecoded = (signature: string, callDataHex: string) => {
  const abiArgs = getAbiArgsStringFromSignature(signature);

  const decoded = ethers.utils.defaultAbiCoder.decode(abiArgs, callDataHex);

  return decoded;
};

//signature: sendOrRegisterDebt(address,uint256)

export const getUsdcPayoutForExecutionData = (executionData?: any[]) => {
  //for every transaction in the execution data, get the calldata decoded
  if (executionData) {
    const calldataDecoded = executionData
      .filter(({ target }) => target === USDC_CONTRACT)
      .map((execution) => {
        const usdc = getCalldataDecoded(
          execution.signature,
          execution.calldata
        );
        return usdc;
      });

    //make an array of all the calldata decoded values
    const payouts: BigNumber[] = calldataDecoded.map((data) => {
      //filter out the first param, which is the address
      return data[1];
    });

    //get total payout in usdc
    const totalPayout = payouts.reduce((acc, payout) => {
      return acc.add(payout);
    }, BigNumber.from(0));

    const usdc = totalPayout.toNumber();

    //return usdc base unit in dollars
    return usdc / 1000000;
  }

  return 0;
};

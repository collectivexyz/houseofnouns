"use client";

import useEns from "libs/hooks/useEns";
import { isEnsName, isEthAddress, shortenIfEthAddress } from "libs/utils/account";

interface Props {
  addressOrName: string;
}

export const EthAddress = (props: Props) => {
  const { addressOrName } = props;
  const { ensName } = useEns(addressOrName);

  if (!isEthAddress(addressOrName) && !isEnsName(addressOrName)) {
    return null;
  }
  return <span className="overflow-ellipsis">{ensName || shortenIfEthAddress(addressOrName)}</span>;
};

export default EthAddress;

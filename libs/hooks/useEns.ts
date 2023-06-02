"use client";

import { useEffect, useState } from "react";
import { isEthAddress } from "../utils/account";
import { withLocalStorageCache } from "../utils/local-storage";
import { getEnsName } from "../web3/ens";

export default function useEns(address: string) {
  const [name, setName] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (!address || !isEthAddress(address)) {
      setName("");
      setIsLoading(false);
      return;
    }

    withLocalStorageCache("ensName", address, () => getEnsName(address))
      .then((ensName: string | null) => setName(ensName))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [address]);

  return { ensName: name, ensIsLoading: isLoading };
}

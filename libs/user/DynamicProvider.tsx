"use client";

import { CoinbaseWalletConnectors } from "@dynamic-labs/coinbase";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { MagicWalletConnectors } from "@dynamic-labs/magic";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { mutate } from "swr";
import { setAccessToken } from "./set-access-token";
import { DYNAMIC_AUTH_CONFIG } from "./dynamic-config";

export const DynamicProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  return (
    <DynamicContextProvider
      settings={{
        ...DYNAMIC_AUTH_CONFIG(),
        walletConnectors: [
          EthereumWalletConnectors,
          CoinbaseWalletConnectors,
          MagicWalletConnectors,
        ],
        eventsCallbacks: {
          onAuthSuccess: async ({ authToken }) => {
            {
              await setAccessToken(authToken);
              await mutate("/routes/profile");
              router.refresh();
            }
          },
        },
      }}
    >
      <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
    </DynamicContextProvider>
  );
};

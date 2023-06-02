import { PublicClient } from "viem";

export async function getTransactionWithRetry(
  infuraProvider: PublicClient,
  transactionHash: `0x${string}`,
  retries = 3,
  delay = 5000
) {
  for (let i = 0; i < retries; i++) {
    try {
      const transaction = await infuraProvider.getTransaction({ hash: transactionHash });
      if (transaction) {
        return transaction;
      }
    } catch (error) {
      console.error(`Error on attempt ${i + 1}:`, error);
    }

    if (i < retries - 1) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error(
    `Transaction with hash "${transactionHash}" could not be found after ${retries} retries.`
  );
}

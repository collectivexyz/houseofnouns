import { DynamicJwt, DynamicJwtFromJSON } from "@dynamic-labs/sdk-api";
import { normalizeEthAddress } from "../utils/account/account";
import { decodeToken } from "./access-token";

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export interface IUser extends DynamicJwt {
  address: string | null;
  ethAddresses: string[];
}

export async function getUserFromToken(token?: string): Promise<IUser | null> {
  if (!token) return null;
  try {
    const jwt: DynamicJwt = DynamicJwtFromJSON(await decodeToken(token));

    if (!jwt || !jwt.sub) return null;

    return {
      ...jwt,
      address: normalizeEthAddress(
        jwt.verifiedAccount?.address || jwt.verifiedCredentials?.[0].address
      ),
      ethAddresses: getEthAddressesFromVerifiedCredentials(
        jwt.verifiedCredentials
      ),
    };
  } catch (e) {
    return null;
  }
}

export const getEthAddressesFromVerifiedCredentials = (
  verifiedCredentials?: DynamicJwt["verifiedCredentials"]
): string[] => {
  if (!verifiedCredentials) return [];

  return (
    verifiedCredentials
      .filter(({ chain, address }) => !!address && chain === "eip155")
      .map((account) => normalizeEthAddress(account?.address))
      .filter(nonNullable) || []
  );
};

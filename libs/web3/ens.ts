import { isEnsName, isEthAddress } from "../utils/account";
import { provider } from "./provider";

export async function resolveEnsName(name: string): Promise<string | null> {
  if (!isEnsName(name)) return null;

  try {
    return (await provider.resolveName(name))?.toLowerCase() || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getEnsName(address: string): Promise<string | null> {
  if (!isEthAddress(address)) return null;

  try {
    return provider.lookupAddress(address);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getEnsLinkedTwitter(name: string): Promise<string | null> {
  try {
    const resolver = await provider.getResolver(name);

    return resolver?.getText("com.twitter") || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getEnsAvatar(name: string): Promise<string | null> {
  if (!isEnsName(name)) return null;

  try {
    return provider.getAvatar(name);
  } catch (e) {
    console.error(e);
    return null;
  }
}

import "server-only";

import { cookies } from "next/headers";
import { TOKEN_KEY } from "./access-token";
import { getUserFromToken } from "./dynamic-payload";

export const getUser = async () => {
  return await getUserFromToken(cookies().get(TOKEN_KEY)?.value);
};

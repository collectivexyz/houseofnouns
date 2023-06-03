import "server-only";

import { cookies } from "next/headers";
import { getUserFromToken } from "./dynamic-payload";

const TOKEN_KEY = `${process.env.NEXT_PUBLIC_TOKEN_KEY}`;

export const getUser = async () => {
  return await getUserFromToken(cookies().get(TOKEN_KEY)?.value);
};

import "server-only";

import { getUserFromToken } from "./dynamic-payload";
import { type NextRequest } from "next/server";

const TOKEN_KEY = `${process.env.NEXT_PUBLIC_TOKEN_KEY}`;

const getTokenFromRouteRequest = (request: NextRequest) => {
  const headers = new Headers(request.headers);
  const token = request.cookies.get(TOKEN_KEY);

  return headers.get("authorization")
    ? headers.get("authorization")?.split(" ")[1]
    : token?.value;
};

export const getUserFromHeaders = async (request: NextRequest) => {
  return await getUserFromToken(getTokenFromRouteRequest(request));
};

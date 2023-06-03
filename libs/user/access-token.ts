"use server";

import { decodeJwt, jwtVerify, type JWTPayload } from "jose";
import { getPublicKey } from "./dynamic-config";

import { cookies } from "next/headers";

const TOKEN_KEY = `${process.env.NEXT_PUBLIC_TOKEN_KEY}`;

export const getAccessToken = () => cookies().get(TOKEN_KEY);

export const decodeToken = async (token: string): Promise<JWTPayload> => {
  const result = await jwtVerify(token, await getPublicKey());
  return result?.payload || null;
};

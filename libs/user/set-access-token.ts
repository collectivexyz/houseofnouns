"use server";

import { decodeJwt } from "jose";
import { getPublicKey } from "./dynamic-config";

import { cookies } from "next/headers";

const TOKEN_KEY = `${process.env.NEXT_PUBLIC_TOKEN_KEY}`;

export const setAccessToken = async (token: string) => {
  cookies().set(TOKEN_KEY, token, { expires: getTokenExpiry(token) });

  // Wait 100ms to ensure cookie is set & available
  await new Promise((resolve) => setTimeout(resolve, 100));
};

const getTokenExpiry = (token: string): Date => {
  const { exp } = decodeJwt(token);
  if (!exp) throw new Error("Error decoding auth token");
  return new Date(exp * 1000);
};

export const removeAccessToken = () => cookies().set(TOKEN_KEY, "");

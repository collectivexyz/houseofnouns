"use client";

import useSWR, { SWRConfiguration, KeyedMutator } from "swr";
import { fetcherWithAccessToken } from "./fetcherWithAT";

export function useApi<Data = any>(
  url: string,
  options?: SWRConfiguration,
  skip?: boolean
): {
  data: Data;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<Data>;
} {
  const absoluteUrl = skip || !url ? undefined : `/api${url}`;
  const { data, error, mutate } = useSWR(absoluteUrl, fetcherWithAccessToken, options);
  const isLoading = skip || !url ? false : !error && (data === undefined || data == null);

  return { data, error, isLoading, mutate };
}

"use client";

import { useState } from "react";
import useSWR, { KeyedMutator, SWRConfiguration } from "swr";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";
import { fetcherWithAccessToken } from "./fetcherWithAT";

export function useRoutesApi<Data = any>(
  url: string,
  options?: SWRConfiguration,
  skip?: boolean,
  refreshIntervalSeconds?: number
): {
  data: Data;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<Data>;
} {
  const absoluteUrl = skip || !url ? undefined : url;
  const { data, error, mutate } = useSWR(absoluteUrl, fetcherWithAccessToken, {
    ...options,
    refreshInterval: refreshIntervalSeconds ? refreshIntervalSeconds * 1000 : undefined,
  });
  const isLoading = skip || !url ? false : !error && (data === undefined || data == null);

  return { data, error, isLoading, mutate };
}

export function useRoutesApiInfinite<Data = any>(
  url: (page: number) => string,
  options?: SWRInfiniteConfiguration<Data>
) {
  const [hasMore, setHasMore] = useState(true);

  const { data, ...rest } = useSWRInfinite<Data>(
    (page, previousPageData) => {
      if (previousPageData && !previousPageData.length) {
        setHasMore(false);
        return null;
      }
      return url(page);
    },
    fetcherWithAccessToken,
    options
  );

  return {
    data: data?.flat(1),
    ...rest,
    hasMore,
  };
}

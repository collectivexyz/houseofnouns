"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function useUrlState<T>(
  key: string
): [T | null, (value: T) => void, boolean] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const param = useMemo(() => searchParams?.get(key) as T, [key, searchParams]);

  const setParam = useCallback(
    (value: T): void => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      if (value) {
        newSearchParams.set(key, value as string);
      } else {
        newSearchParams.delete(key);
      }

      startTransition(() => {
        router.replace(`${pathname}?${newSearchParams.toString()}`);
      });
    },
    [key, pathname, router, searchParams]
  );

  return [param, setParam, isPending];
}

//set url state for multiple keyvalues
export function useSetUrlState() {
  const searchParams = new URLSearchParams(
    isBrowser() ? window.location.search : []
  );
  const pathname = usePathname();
  const router = useRouter();
  const [_, startTransition] = useTransition();

  const setParams = (params: Record<string, string>) => {
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
      else searchParams.delete(key);
    });

    startTransition(() => {
      router.replace(`${pathname}?${searchParams.toString()}`);
    });
  };

  return setParams;
}

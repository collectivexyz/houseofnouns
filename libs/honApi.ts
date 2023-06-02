import { getAccessToken } from "libs/user/access-token";
import wretch from "wretch";

export const honApi = async <T>(
  path,
  params = {},
  method: "GET" | "POST" = "GET",
  transform: (data: T) => T = data => data
): Promise<HonRes<T>> => {
  const urlObj = new URL(
    (process.env.NEXT_PUBLIC_HON_API_URL || "http://localhost:3000/api/") + path
  );
  // @ts-ignore
  urlObj.search = new URLSearchParams(params);

  // use localApi
  if (method === "GET") {
    const res = await wretch()
      .auth(`Bearer ${getAccessToken()}`)
      .get(urlObj.toString())
      .text()
      .catch(e => {
        console.error({ error: "Error for API " + urlObj.toString() + ": ", e });
        return { data: null };
      });
    let json = null;
    try {
      // @ts-ignore
      json = JSON.parse(res);
    } catch (e) {
      console.error({ error: "Error for API " + urlObj.toString() + ": ", e, res });
    }
    return { data: transform(json?.data) };
  } else if (method === "POST") {
    return await wretch()
      .auth(`Bearer ${getAccessToken()}`)
      .post(urlObj.toString())
      .json()
      .then((res: HonRes<T>) => {
        return { ...res, data: transform(res.data) };
      });
  }
};

export const honApiOldStatic = async <T>(
  path,
  params = {},
  method: "GET" | "POST" = "GET",
  transform: (data: T) => T = data => data
): Promise<HonRes<T>> => {
  const urlObj = new URL(
    (process.env.NEXT_PUBLIC_HON_API_URL || "http://localhost:3000/api/") + path
  );
  // @ts-ignore
  urlObj.search = new URLSearchParams(params);

  // use localApi
  return (await wretch()
    .get(urlObj.toString())
    .json()
    .then((res: HonRes<T>) => {
      return { ...res, data: transform(res.data) };
    })
    .catch(e => {
      console.error({ error: e });
      return { data: null };
    })) as HonRes<T>;
};

export interface HonApiOptions<T> {
  method?: "GET" | "POST";
  transform?: (data: T) => T;
  cache?: RequestCache;
  revalidate?: number;
  auth?: boolean;
}

export const honApiStatic = async <T>(
  path,
  params = {},
  options: HonApiOptions<T> = {}
): Promise<HonRes<T>> => {
  const urlObj = new URL(
    (process.env.NEXT_PUBLIC_HON_API_URL || "http://localhost:3000/api/") + path
  );
  // some random string reqId to prevent caching (TODO REMOVE)
  // @ts-ignore
  urlObj.search = new URLSearchParams({ ...params });

  const {
    method = "GET",
    transform = data => data,
    cache = "force-cache",
    revalidate,
    auth = false,
  } = options;

  const requestOptions = {
    ...(method && { method }),

    ...(auth && {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }),
    ...(cache === "no-store" && { reqId: Math.random().toString(36).substring(2, 8) }),
    cache: cache,
    ...(revalidate != undefined && {
      next: {
        revalidate,
      },
    }),
  };

  // use localApi
  return (await fetch(urlObj.toString(), requestOptions)
    .then(res => res.json())
    .then((res: HonRes<T>) => {
      return { ...res, data: transform(res.data) };
    })
    .catch(e => {
      console.error({ error: e });
      return { data: null };
    })) as HonRes<T>;
};

export interface HonRes<T> {
  data: T;
}

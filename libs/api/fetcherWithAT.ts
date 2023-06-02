import { getAccessToken } from "../user/access-token";

export async function fetcherWithAccessToken(url: string) {
  const token = getAccessToken();
  const options: any = {};
  options.headers = token ? { Authorization: `Bearer ${token}` } : {};

  return fetch(url, options).then(async res => {
    if (!res.ok) throw await res.json();
    return res.json();
  });
}

import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString";
import { getAccessToken } from "../user/access-token";

export const api = () =>
  wretch()
    .addon(QueryStringAddon)
    .auth(`Bearer ${getAccessToken()}`)
    .url(apiUrl())
    .catcher(404, () => null);

export const apiUrl = (): string => `${process.env.NEXT_PUBLIC_API_URL}`;

import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString";
import { getAccessToken } from "../user/access-token";

export const localApi = () => wretch().auth(`Bearer ${getAccessToken()}`).addon(QueryStringAddon);

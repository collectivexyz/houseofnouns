import { cache } from "react";
import { social } from "../..";
import { transformCommunity } from "./Community";

export function Communities() {
  return Object.assign(social.community, {
    findBySlug,
  });
}

const findBySlug = cache(async (slug: string) => {
  const community = await social.community.findUnique({ where: { slug } });
  return community;
});

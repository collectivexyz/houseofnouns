import "server-only";

import { cache } from "react";
import { social } from "../..";
import { OpenGraphService } from "../../services/links/opengraph.service";

export function Links() {
  return Object.assign(social.link, {
    get,
  });
}

const get = cache(async (url: string) => {
  const link = await social.link.findFirst({ where: { url } });
  if (link) return link;

  const opengraph = await OpenGraphService.get(url);
  if (!opengraph) return null;

  return await social.link.create({ data: { url, ...opengraph } });
});

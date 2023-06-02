import "server-only";

import scrapeOpenGraph from "open-graph-scraper";
import { IOpenGraph } from "./interfaces/categorized-link";

export class OpenGraphService {
  public static async get(url: string): Promise<IOpenGraph> {
    try {
      const { error, result } = await scrapeOpenGraph({ url });

      if (error) throw new Error(`Couldn't get Open Graph data`);

      const res = {
        title: result.ogTitle,
        description: result.ogDescription,
        imageUrl: result.ogImage?.[0]?.url?.replace("undefined//", "https://"),
      };

      return res;
    } catch (e) {
      // console.error(e);
      return {
        title: undefined,
        description: undefined,
        imageUrl: undefined,
      };
    }
  }
}

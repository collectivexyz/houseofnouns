import "server-only";

import { ICategorizedLink } from "../interfaces/categorized-link";
import { CategoryTypeEnum } from "../interfaces/category-type.enum";
import { IExtractor } from "../interfaces/extractor";
import { PlatformTypeEnum } from "../interfaces/platform-type.enum";

export class TwitterExtractor implements IExtractor {
  public constructor() {}

  public async extract(url: string) {
    const tweetId = this.getTweetId(url);
    const username = this.getUsername(url);

    const link: ICategorizedLink = {
      url,
      profile: username ? { username } : {},
      platform: PlatformTypeEnum.Twitter,
      category: tweetId ? CategoryTypeEnum.Post : CategoryTypeEnum.Profile,
    };

    return link;
  }

  private getTweetId(url: string): string | null {
    if (!url.includes("status/")) return null;
    return url.split("status/")[1]?.split("?")[0];
  }

  private getUsername(url: string): string | null {
    if (url.includes("status/")) return null;
    return url.split("twitter.com/")[1]?.split("?")[0].replace("@", "");
  }
}

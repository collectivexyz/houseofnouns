import "server-only";

import { GithubExtractor } from "./extractors/GithubExtractor";
import { InstagramExtractor } from "./extractors/InstagramExtractor";
import { TwitterExtractor } from "./extractors/TwitterExtractor";
import { VimeoExtractor } from "./extractors/VimeoExtractor";
import { YoutubeExtractor } from "./extractors/YoutubeExtractor";
import { GnarsIPFSExtractor } from "./extractors/GnarsIPFSExtractor";
import { ICategorizedLink } from "./interfaces/categorized-link";
import { CategoryTypeEnum } from "./interfaces/category-type.enum";
import { platformDomainMap, PlatformTypeEnum } from "./interfaces/platform-type.enum";
import { OpenGraphService } from "./opengraph.service";

export type MediaType = "video" | "image" | "audio" | "application" | "text" | "other";

export class LinkService {
  public static async extract(
    url: string,
    mediaType?: MediaType,
    platform = this.guessPlatform(url)
  ): Promise<ICategorizedLink | null> {
    if (!url) return null;
    url = url.endsWith("/") ? url.slice(0, -1) : url;

    switch (platform) {
      case PlatformTypeEnum.Instagram:
        return await new InstagramExtractor().extract(url);
      case PlatformTypeEnum.YouTube:
        return await new YoutubeExtractor().extract(url);
      case PlatformTypeEnum.Pinata:
        return await new GnarsIPFSExtractor().extract(url, mediaType);
      case PlatformTypeEnum.Vimeo:
        return await new VimeoExtractor().extract(url);
      case PlatformTypeEnum.Twitter:
        return await new TwitterExtractor().extract(url);
      case PlatformTypeEnum.GitHub:
        return await new GithubExtractor().extract(url);
      case PlatformTypeEnum.PodBean:
      case PlatformTypeEnum.Discourse:
      case PlatformTypeEnum.Discord:
      case PlatformTypeEnum.NftStorage:
        return {
          url,
          platform,
          category: CategoryTypeEnum.Other,
        };
      default:
        return {
          url,
          platform,
          category: CategoryTypeEnum.Other,
          openGraph: await OpenGraphService.get(url),
        };
    }
  }

  private static guessPlatform(url: string): PlatformTypeEnum | null {
    if (!url) return null;
    if (url.includes("discourse.")) return PlatformTypeEnum.Discourse; // URLs like discourse.nouns.wtf
    if (url.includes("nftstorage.link")) return PlatformTypeEnum.NftStorage; // URLs like discourse.nouns.wtf
    const domain = this.getDomain(url);
    return platformDomainMap[domain] || null;
  }

  private static getDomain(url: string): string {
    return new URL(url).hostname.split(".").slice(-2).join(".");
  }
}

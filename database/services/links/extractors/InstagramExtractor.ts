import "server-only";

import { AspectRatioTypeEnum } from "../interfaces/aspect-ratio-type.enum";
import { ICategorizedLink, IOpenGraph } from "../interfaces/categorized-link";
import { CategoryTypeEnum } from "../interfaces/category-type.enum";
import { IExtractor } from "../interfaces/extractor";
import { PlatformTypeEnum } from "../interfaces/platform-type.enum";
import { OpenGraphService } from "../opengraph.service";

export class InstagramExtractor implements IExtractor {
  public async extract(url: string) {
    const postId = this.getPostId(url);
    const username = this.getUsername(url);

    const isReel = url.includes("/reel/");

    const link: ICategorizedLink = {
      url,
      platform: PlatformTypeEnum.Instagram,
      category: postId ? CategoryTypeEnum.Video : CategoryTypeEnum.Profile,
    };

    const openGraph: IOpenGraph = await OpenGraphService.get(url);

    if (postId) {
      const video: ICategorizedLink["video"] = {};

      video.embedUrl = this.getEmbedUrl(postId, isReel);
      video.aspectRatio = AspectRatioTypeEnum.Vertical;
      video.title = this.getTitle(openGraph);
      video.description = openGraph.description;

      if (Object.keys(video)) link.video = video;
    } else {
      let name = openGraph.title?.split(" (")[0];

      if (name?.startsWith("Login •")) {
        name = username;
      }

      link.profile = {
        avatarUrl: openGraph.imageUrl,
        name,
        username,
      };
    }

    return link;
  }

  private getEmbedUrl(id: string, isReel: boolean): string {
    if (isReel) return this.getReelEmbedUrl(id);

    return `https://www.instagram.com/p/${id}/embed/?autoplay=1`;
  }

  private getReelEmbedUrl(id: string): string {
    return `https://www.instagram.com/reel/${id}/embed/?autoplay=1`;
  }

  private getTitle(openGraph: IOpenGraph): string | undefined {
    if (!openGraph?.title) return;
    // opengraph for video link {
    //   title: 'Bob Joe on Instagram: "Bird watching it sneaks up on you, so do the holidays. constant vigilance"',

    //remove the username from the title and get the part in quotes
    const match = openGraph.title.match(/(?<=")(.*)(?=")/);

    if (match && match[0]) return match[0];
  }

  private getPostId(url: string): string | null {
    // https://www.instagram.com/p/Cm07pj1OAJl
    // https://www.instagram.com/reel/Cm07pj1OAJl

    //match on posts and reels
    const match = url.match(/(?<=\/p\/|\/reel\/)[^\/]*/);

    return match && match[0] ? match[0] : null;
  }

  private getUsername(url: string): string | undefined {
    if (url.includes("/p/")) return;
    return url?.split("instagram.com/")[1]?.split("?")[0];
  }
}

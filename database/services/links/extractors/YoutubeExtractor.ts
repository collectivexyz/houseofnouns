import "server-only";

import { AspectRatioTypeEnum } from "../interfaces/aspect-ratio-type.enum";
import { ICategorizedLink } from "../interfaces/categorized-link";
import { CategoryTypeEnum } from "../interfaces/category-type.enum";
import { IExtractor } from "../interfaces/extractor";
import { PlatformTypeEnum } from "../interfaces/platform-type.enum";
import { OpenGraphService } from "../opengraph.service";

export class YoutubeExtractor implements IExtractor {
  public async extract(url: string) {
    const openGraph = await OpenGraphService.get(url);

    const videoId = this.getVideoId(url);
    const username = this.getUsername(url);

    const link: ICategorizedLink = {
      url,
      platform: PlatformTypeEnum.YouTube,
      category: videoId ? CategoryTypeEnum.Video : CategoryTypeEnum.Profile,
    };

    if (videoId) {
      const video: ICategorizedLink["video"] = {};

      video.title = openGraph.title;
      video.aspectRatio = this.getAspectRatio(url);
      video.embedUrl = this.getEmbedUrl(videoId);
      video.description = openGraph.description;

      if (Object.keys(video)) {
        link.video = video;
      }
    }

    if (username) {
      link.profile = { username: username === "channel" ? openGraph.title : username };
    }

    return link;
  }

  private getAspectRatio(url: string): AspectRatioTypeEnum {
    return url.includes("shorts") ? AspectRatioTypeEnum.Vertical : AspectRatioTypeEnum.Horizontal;
  }

  private getEmbedUrl(videoId: string): string {
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&showinfo=0&rel=0&dark_theme=1&mute=1`;
  }

  private getVideoId(url: string): string | null {
    const match = url.match(
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/
    );
    return match && match[2].length === 11 ? match[2] : null;
  }

  private getUsername(url: string): string | null {
    const usernameRegex = /(?:http(?:s)?:\/\/)?(?:www\.)?youtube\.com\/([^\/\?#&]*)/;
    const match = url.match(usernameRegex);
    return match && match[1] ? match[1].replace("@", "") : null;
  }
}

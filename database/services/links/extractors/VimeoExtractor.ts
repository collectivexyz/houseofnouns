import "server-only";

import { AspectRatioTypeEnum } from "../interfaces/aspect-ratio-type.enum";
import { ICategorizedLink } from "../interfaces/categorized-link";
import { CategoryTypeEnum } from "../interfaces/category-type.enum";
import { IExtractor } from "../interfaces/extractor";
import { PlatformTypeEnum } from "../interfaces/platform-type.enum";
import { OpenGraphService } from "../opengraph.service";

export class VimeoExtractor implements IExtractor {
  public async extract(url: string) {
    const videoId = this.getVideoId(url);

    const link: ICategorizedLink = {
      url,
      platform: PlatformTypeEnum.Vimeo,
      category: CategoryTypeEnum.Video,
    };

    const openGraph = await OpenGraphService.get(url);

    if (videoId) {
      const video: ICategorizedLink["video"] = {};
      const aspectRatio = this.getAspectRatio(openGraph.imageUrl);

      video.title = openGraph.title;
      video.thumbnailUrl = this.getThumbnailUrl(videoId) || openGraph.imageUrl;
      video.aspectRatio = aspectRatio;
      video.embedUrl = this.getEmbedUrl(videoId);

      if (Object.keys(video).length) {
        link.video = video;
      }
    }

    return link;
  }

  private getThumbnailUrl(videoId: string): string {
    return `https://vumbnail.com/${videoId}_large.jpg`;
  }

  private getEmbedUrl(videoId: string): string {
    return `https://player.vimeo.com/video/${videoId}?h=1703939b54&autoplay=1&title=0&byline=0&portrait=0&muted=true`;
  }

  private getVideoId(url: string): string | null {
    const match = /vimeo.*\/(\d+)/i.exec(url);
    return match ? match[1] : null;
  }

  //get aspect ratio from preview image url width and height in url params
  private getAspectRatio(url?: string): AspectRatioTypeEnum {
    if (!url) {
      return AspectRatioTypeEnum.Horizontal;
    }

    const match = /(\d+)x(\d+)/i.exec(url);
    if (match) {
      const width = parseInt(match[1], 10);
      const height = parseInt(match[2], 10);
      if (width > height) {
        return AspectRatioTypeEnum.Horizontal;
      } else {
        return AspectRatioTypeEnum.Vertical;
      }
    }

    return AspectRatioTypeEnum.Horizontal;
  }
}

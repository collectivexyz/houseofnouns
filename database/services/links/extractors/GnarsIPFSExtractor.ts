import { AspectRatioTypeEnum } from "../interfaces/aspect-ratio-type.enum";
import { ICategorizedLink } from "../interfaces/categorized-link";
import { CategoryTypeEnum } from "../interfaces/category-type.enum";
import { IExtractor } from "../interfaces/extractor";
import { PlatformTypeEnum } from "../interfaces/platform-type.enum";
import { MediaType } from "../link.service";

export class GnarsIPFSExtractor implements IExtractor {
  public async extract(url: string, mediaType?: MediaType) {
    const videoId = this.getVideoId(url);

    const link: ICategorizedLink = {
      url,
      platform: PlatformTypeEnum.ZoraIPFS,
      category: CategoryTypeEnum.Video,
    };
    if (videoId) {
      link.video = {
        thumbnailUrl: this.getThumbnailUrl(videoId, mediaType) || "",
        embedUrl: this.getEmbedUrl(videoId),
        aspectRatio: AspectRatioTypeEnum.Horizontal,
      };
    }

    return link;
  }

  //get thumbnail url from ipfs hash
  private getThumbnailUrl(videoId: string, mediaType?: MediaType): string | null {
    if (mediaType === "video") return null;
    return `https://thatsgnarly.mypinata.cloud/ipfs/${videoId}?img-height=450`;
  }

  private getEmbedUrl(videoId: string): string {
    return `https://thatsgnarly.mypinata.cloud/ipfs/${videoId}?stream=true`;
  }

  private getVideoId(url: string): string | null {
    //pull ipfsHash from url, if it exists
    const match = url.match(/.mypinata.cloud\/ipfs\/(.*)/);
    return match ? match[1] : null;
  }
}

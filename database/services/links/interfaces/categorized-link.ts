import { AspectRatioTypeEnum } from "./aspect-ratio-type.enum";
import { CategoryTypeEnum } from "./category-type.enum";
import { PlatformTypeEnum } from "./platform-type.enum";

export interface ICategorizedLink {
  url: string;
  category: CategoryTypeEnum;
  platform: PlatformTypeEnum | null;

  video?: ICategorizedVideo;
  profile?: ICategorizedProfile;
  post?: ICategorizedPost;
  openGraph?: IOpenGraph;
}

export interface ICategorizedVideo {
  thumbnailUrl?: string;
  embedUrl?: string;
  title?: string;
  description?: string;
  aspectRatio?: AspectRatioTypeEnum;
}

export interface ICategorizedProfile {
  username?: string;
  avatarUrl?: string;
  name?: string;
}

export interface ICategorizedPost {
  createdAt?: string;
  text: string;
  user?: ICategorizedProfile;
}

export interface IOpenGraph {
  title?: string;
  description?: string;
  imageUrl?: string;
}

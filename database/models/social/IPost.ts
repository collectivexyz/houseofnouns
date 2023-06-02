import { Post, Profile } from "prisma-social";

export interface IPost extends Post {
  authorProfileUrl?: string;
  profile?: Profile;
  children?: IPost[];
}

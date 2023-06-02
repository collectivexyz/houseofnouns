import { Post, Profile } from "prisma-social";
import { IPost } from "./IPost";

interface ProfilePopulated extends Post {
  profile?: Profile | null;
}

export function transformPost(post: ProfilePopulated): IPost | null {
  if (!post) return null;

  const { scope } = post;

  return Object.assign(post, {
    authorProfileUrl: scope.type === "submission" ? `/user/${post.address}` : undefined,
    profile: post.profile ?? undefined,
  });
}

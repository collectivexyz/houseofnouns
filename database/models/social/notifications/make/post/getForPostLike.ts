import { Notification, Profile, Scope } from "prisma-social";
import { IPost } from "../../../IPost";
import { makePostLikeNotification } from "./PostLike";

export const getForPostLike = (post: IPost, liker: Profile, url: string, scope: Scope) => {
  const { address: authorAddress } = post;
  if (!authorAddress) return null;

  return makePostLikeNotification({
    url,
    liker,
    addressToNotify: post.address,
    scope,
  }) as Notification;
};

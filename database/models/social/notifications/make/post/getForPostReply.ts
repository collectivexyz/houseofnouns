import { Notification, Scope } from "prisma-social";
import { social } from "../../../../..";
import { makePostReplyNotification } from "./PostReply";
import { IPost } from "../../../IPost";

export const getForPostReply = async (post: IPost, url: string, scope: Scope) => {
  const { address: authorAddress, profile: poster } = post;
  if (!authorAddress || !post.parentPostId) return null;

  const parentPost = await social.post.findFirst({
    where: { postId: post.parentPostId },
  });

  return makePostReplyNotification({
    url,
    addressToNotify: parentPost?.address ?? null,
    poster,
    post,
    scope,
  }) as Notification;
};

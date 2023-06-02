import { Notification, Profile, Post, NotificationType, Scope } from "prisma-social";
import { getProfileMarkdownLink } from "../getProfileMarkdownLink";

interface IProps {
  post: Post;
  poster?: Profile | null;
  addressToNotify: string | null;
  url: string;
  scope: Scope;
}

export function makePostReplyNotification(data: IProps): Omit<Notification, "id"> | null {
  const { post, poster, url, addressToNotify, scope } = data;
  if (!poster || !addressToNotify) return null;

  const isReplyingToComment = !!post?.parentPostId;

  const link = getProfileMarkdownLink(poster);

  let title = `${link} commented on your post`;
  if (isReplyingToComment) {
    title = `${link} replied to your comment`;
  }

  if (post.address === addressToNotify) return null;

  return {
    type: NotificationType.PostReply,
    address: addressToNotify,
    scope,
    isAcknowledged: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    title,
    subtitle: post.markdown,
    url,
    imageUrl: poster.profilePicture,
  };
}

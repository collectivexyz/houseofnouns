import { Notification, Profile, Post, NotificationType, Scope } from "prisma-social";
import { getProfileMarkdownLink } from "../getProfileMarkdownLink";

interface IProps {
  liker: Profile | null;
  addressToNotify: string | null;
  url: string;
  scope: Scope;
}

export function makePostLikeNotification(data: IProps): Omit<Notification, "id"> | null {
  const { liker, url, addressToNotify, scope } = data;
  if (!liker || !addressToNotify) return null;

  // const isReplyingToComment = !!post?.parentPostId;

  const title = `${getProfileMarkdownLink(liker)} liked your comment`;

  if (liker.address === addressToNotify) return null;

  return {
    type: NotificationType.PostLike,
    address: addressToNotify,
    isAcknowledged: false,
    createdAt: new Date(),
    scope,
    updatedAt: new Date(),
    subtitle: "",
    title,
    url,
    imageUrl: liker.profilePicture,
  };
}

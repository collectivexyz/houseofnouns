import { Notification, Profile, Scope } from "prisma-social";
import { social } from "../../../";

import { getForPostReply, getForPostLike } from "./make/post";
import { IPost } from "../IPost";

export function Notifications() {
  return Object.assign(social.notification, {
    getForUser,
    getUnreadCountForUser,
    update,
    markAllAsReadForUser,
    createForPostLike,
    createForPost,
  });
}

const getForUser = async (
  addresses: string[],
  args: { page: number; take: number; filters?: Partial<Notification> },
  scopeId?: string
) => {
  const { page, take, ...filters } = args;
  const skip = page * take;

  const notifications = await social.notification.findMany({
    where: {
      address: { in: addresses },
      scope: { is: { id: scopeId } },
      ...(filters || {}),
    },
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });

  return notifications;
};

const getUnreadCountForUser = async (
  addresses: string[],
  scope: Scope
): Promise<number> => {
  return await social.notification.count({
    where: { address: { in: addresses }, isAcknowledged: false, scope },
  });
};

const update = async (
  id: string,
  address: string,
  data: Partial<Notification>
) => {
  return await social.notification.update({
    where: { id },
    data,
    select: { address: true },
  });
};

const markAllAsReadForUser = async (
  addresses: string[],
  scope: Scope
): Promise<boolean> => {
  const result = await social.notification.updateMany({
    where: { address: { in: addresses }, isAcknowledged: false, scope },
    data: { isAcknowledged: true },
  });
  return result.count > 0;
};

const createNotification = async (notification: Notification | null) => {
  if (!notification) return null;

  return await social.notification.create({ data: notification });
};

//when someone replies to your post or comment
const createForPost = async (post: IPost, scope: Scope) => {
  if (post?.scope?.type === "submission") {
    await Promise.all([
      //notify submission creator
      //if is reply to comment, notify parent post creator
      createNotification(
        await getForPostReply(post, `/creations/${post.scope.id}`, scope)
      ),
    ]);
  }
};

//when someone likes your comment or post
const createForPostLike = async (
  post: IPost,
  liker: Profile | null,
  scope: Scope
) => {
  if (!liker) return null;

  if (post?.scope?.type === "submission") {
    const likeNotification = getForPostLike(
      post,
      liker,
      `/creations/${post.scope.id}`,
      scope
    );

    await createNotification(likeNotification as Notification);
  }
};

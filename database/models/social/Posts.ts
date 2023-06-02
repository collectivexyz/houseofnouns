import { Post, Scope, ScopeType } from "prisma-social";
import { cache } from "react";
import { social } from "../..";
import { IPost } from "./IPost";
import { transformPost } from "./Post";
import { Notifications } from "./notifications/Notifications";

export function Posts() {
  return Object.assign(social.post, {
    add,
    toggleVote,
    getForScope,
    isValidScopeType,
  });
}

const getForScope = cache(async (scopeId: Scope["id"]): Promise<IPost[]> => {
  const posts = await social.post.findMany({
    where: {
      scope: {
        is: {
          id: scopeId,
        },
      },
      deleted: false,
      OR: [
        { parentPostId: { equals: social.post.fields.rootPostId } },
        {
          AND: [
            { parentPostId: { isSet: false } },
            { author: { notIn: ["google-oauth2|115033616590267455429", "SubmissionService"] } },
          ],
        },
      ],
    },
    include: {
      profile: { select: { username: true, profilePicture: true } },
      children: {
        include: {
          profile: { select: { username: true, profilePicture: true } },
          children: {
            include: {
              profile: { select: { username: true, profilePicture: true } },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const transformed = posts.map(transformChildren);

  return transformed.filter((post): post is IPost => post !== null);
});

const transformChildren = (post: Post & { children?: Post[] }) => {
  const transformedPost = transformPost(post);

  if (!transformedPost) return null;

  const children = post?.children;
  if (children) {
    const transformedChildren = children.map(transformChildren);

    transformedPost.children = transformedChildren.filter(
      (child): child is IPost => child !== null
    );
  }
  return transformedPost;
};

const add = async (
  data: Pick<Post, "author" | "markdown" | "parentPostId" | "rootPostId" | "scope" | "address">,
  notificationScope: Scope
) => {
  const post = await social.post.create({ data, include: { profile: true } });

  if (post?.parentPostId) {
    await social.post.update({
      where: { postId: post.parentPostId },
      data: { childrenCount: { increment: 1 } },
    });
  }

  if (post.profile) await Notifications().createForPost(post as IPost, notificationScope);

  return post;
};

const toggleVote = async (postId: string, userId: string, revolutionId?: string) => {
  const [post, liker] = await Promise.all([
    social.post.findFirst({
      where: { postId },
      include: { profile: true },
    }),
    social.communityProfile.findFirst({
      where: { userId },
      include: { profile: true },
    }),
  ]);

  if (!post) return;

  const action = post.upvotes.includes(userId) ? "downvote" : "upvote";

  const updatedPost = await social.post.update({
    where: { postId },
    data:
      action === "upvote"
        ? {
            upvoteCount: { increment: 1 },
            upvotes: { push: userId },
          }
        : {
            upvoteCount: { decrement: 1 },
            upvotes: { set: post.upvotes.filter(u => u !== userId) },
          },
    select: { upvotes: true },
  });

  if (action === "upvote" && liker) {
    const scope: Scope = revolutionId ? { type: "revolution", id: revolutionId } : post.scope;
    await Notifications().createForPostLike(post as IPost, liker?.profile ?? null, scope);
  }

  return updatedPost;
};

function isValidScopeType(type: string): type is ScopeType {
  return Object.keys(ScopeType).includes(type as ScopeType);
}

export const putAuthorFirst = (comments: IPost[], authorUserId: string) => {
  const submissionComments = comments.filter(comment => comment.author === authorUserId);
  const otherComments = comments.filter(comment => comment.author !== authorUserId);
  return [...submissionComments, ...otherComments];
};

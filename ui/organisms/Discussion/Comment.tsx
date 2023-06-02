"use client";

import cx from "classnames";
import { IPost } from "database/types";
import { useUser } from "libs/hooks/useUser";
import { shortenIfEthAddress } from "libs/utils";
import { Profile } from "prisma-social";
import { useState } from "react";
import { Avatar, DateRelative } from "../../atoms";
import CommentIcon from "../../pixel-icons/Comment";
import { ConditonalWrapper } from "../../utils/react/react";
import { AddComment } from "./AddComment";
import { CommentBody } from "./CommentBody";
import { Comments } from "./Comments";
import { UpvoteButton } from "./UpvoteButton";

interface Props {
  comment: (IPost & { children?: IPost[]; profile?: Profile }) | null;
  level: number;
  variant?: "base" | "compact";
  isServerSide?: boolean;
}

export const Comment = (props: Props) => {
  const { comment, level, variant, isServerSide } = props;

  if (!comment) {
    throw new Error("Comment: comment is required");
  }
  const { isAuthenticated, login } = useUser();

  const [isCommenting, setIsCommenting] = useState(false);

  const displayName = shortenIfEthAddress(
    comment.profile?.username || comment.address || comment.author
  );

  return (
    <div className="flex flex-row items-start">
      <div className={cx("mr-4 h-8 w-8 rounded-lg", { "md:h-12 md:w-12": variant === "base" })}>
        <Avatar
          id={comment.author || ""}
          imageUrl={comment.profile?.profilePicture}
          borderRadius="lg"
          size={48}
        />
      </div>
      <div
        className={cx("relative flex-1", {
          "before:absolute before:bottom-0 before:left-[-40px] before:top-[58px] before:block before:w-px before:bg-[#161C3926] before:content-['']":
            level === 1,
        })}
      >
        <section className="relative space-y-1 text-black dark:text-white">
          <div className="flex items-center space-x-1.5">
            <span
              className={cx("inline-block max-w-[120px] truncate font-semibold lg:max-w-[180px]", {
                "text-base": variant === "base",
                "text-[13px]": variant === "compact",
              })}
            >
              <ConditonalWrapper
                condition={!!comment.authorProfileUrl}
                wrapper={children => (
                  <a href={comment.authorProfileUrl} className="hover:underline" target="_blank">
                    {children}
                  </a>
                )}
              >
                <>{displayName}</>
              </ConditonalWrapper>
            </span>
            <div
              className={cx("dark:text-d-neutral-200 text-neutral-600", {
                "text-sm": variant === "base",
                "text-xs": variant === "compact",
              })}
            >
              <DateRelative date={comment.createdAt.toString()} variant="short" />
            </div>
          </div>

          <div
            className={cx({
              "text-base": variant === "base",
              "text-[13px]": variant === "compact",
            })}
          >
            <CommentBody content={comment.content || ""} markdown={comment.markdown || ""} />
          </div>
          <div className="flex items-center gap-x-4 pt-1.5 text-xs">
            <UpvoteButton postId={comment.postId || ""} upvotes={comment.upvotes || []} />

            {level < 3 && (
              <button
                className="text-light-gray flex select-none items-center space-x-1.5 opacity-75 duration-150 hover:opacity-100"
                onClick={() => (isAuthenticated ? setIsCommenting(!isCommenting) : login())}
              >
                <CommentIcon className="h-4 w-4" />
                <span>{comment.childrenCount}</span>
              </button>
            )}
          </div>
        </section>

        {isCommenting && isAuthenticated && (
          <div className="my-4">
            <AddComment
              scope={comment.scope}
              parentPostId={comment.postId}
              rootPostId={comment.rootPostId || undefined}
              onSuccess={() => setIsCommenting(false)}
              variant={variant}
              isServerSide={isServerSide}
              autofocus
            />
          </div>
        )}

        {level < 3 && !!comment.children?.length && (
          <div className="mt-4">
            <Comments
              comments={comment.children}
              level={level + 1}
              variant={variant}
              isServerSide={isServerSide}
            />
          </div>
        )}
      </div>
    </div>
  );
};

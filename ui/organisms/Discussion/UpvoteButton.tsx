"use client";

import cx from "classnames";
import { localApi } from "libs/api/local";
import { useUser } from "libs/hooks/useUser";
import { Post } from "prisma-social";
import { useCallback, useEffect, useState } from "react";
import Heart from "../../pixel-icons/Heart";
import HeartFull from "../../pixel-icons/HeartFull";
import { toast } from "../Notifications";

type Props = Pick<Post, "upvotes" | "postId">;

export const UpvoteButton = (props: Props) => {
  const { postId, upvotes: initialUpvotes = [] } = props;
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated, login } = useUser();
  const [hasUpvoted, setHasUpvoted] = useState(user?.userId && upvotes.includes(user.userId));

  const toggleVote = useCallback(async () => {
    try {
      setHasUpvoted(current => !current);
      setIsLoading(true);
      const response: { upvotes: string[] } = await localApi()
        .url("/routes/discussion/upvote")
        .post({ postId })
        .json();
      setUpvotes(response.upvotes);
    } catch {
      setHasUpvoted(current => !current);
      toast.error("Unexpected error. Please try again");
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    user?.userId && upvotes.includes(user.userId);
  }, [user, upvotes]);

  return (
    <button
      onClick={() => (isAuthenticated ? toggleVote() : login())}
      disabled={isLoading}
      className="flex select-none items-center space-x-1.5 opacity-75 duration-150 hover:opacity-100"
    >
      {hasUpvoted ? (
        <HeartFull className="h-4 w-4" />
      ) : (
        <Heart className="text-light-gray h-4 w-4" />
      )}
      <span className={cx("text-light-gray", { "animate-pulse": isLoading })}>
        {upvotes.length}
      </span>
    </button>
  );
};

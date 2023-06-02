"use client";

import cx from "classnames";
import { localApi } from "libs/api/local";
import { useUser } from "libs/hooks/useUser";
import { useRouter } from "next/navigation";
import { Post, Scope } from "prisma-social";
import { useEffect, useState, useTransition } from "react";
import { TextArea } from "../../atoms";
import { UserAvatar } from "../../molecules";
import { toast } from "../Notifications";
import { useComments } from "./useComments";

type Props = {
  scope: Scope;
  rootPostId?: string;
  parentPostId?: string;
  onSuccess?: (post: Post) => void;
  variant?: "base" | "compact";
  autosize?: boolean;
  placeholder?: string;
  isServerSide?: boolean;
  autofocus?: boolean;
};

export const AddComment = (props: Props) => {
  const {
    scope,
    parentPostId,
    rootPostId,
    onSuccess = () => undefined,
    variant = "base",
    autosize = true,
    isServerSide = true,
    autofocus,
  } = props;
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [content, setContent] = useState("");
  const [placeholder, setPlaceholder] = useState("Sign in to add comment...");
  const { isAuthenticated, login, isLoading: isUserLoading } = useUser();
  const { mutate } = useComments(scope, isServerSide);

  const onSubmitComment = async () => {
    if (content.trim().length === 0 || isFetching) return;

    try {
      setIsFetching(true);
      const response: { post: Post } = await localApi()
        .url("/routes/discussion/comment")
        .post({ scope, parentPostId, rootPostId, content })
        .json();

      startTransition(() => {
        isServerSide ? router.refresh() : mutate();
        setContent("");
        onSuccess(response.post);
      });
    } catch {
      toast.error("Error saving your comment.");
    } finally {
      setIsFetching(false);
    }
  };

  const isLoading = isFetching || isPending;
  const isReply = !!parentPostId;

  useEffect(() => {
    if (!isAuthenticated) setPlaceholder("Sign in to add comment...");
    setPlaceholder(isReply ? "Reply..." : "Write your comment...");
  }, [isAuthenticated, isReply]);

  return (
    <div
      className="items-top flex"
      onClick={(e) => {
        if (!isAuthenticated) {
          e.stopPropagation();
          login();
        }
      }}
    >
      <div
        className={cx("mr-4 h-8 w-8", {
          "lg:h-12 lg:w-12": variant === "base",
        })}
      >
        <UserAvatar size={48} borderRadius="lg" />
      </div>
      <div
        className={cx("flex flex-1 space-x-1.5", {
          "items-end": variant === "base",
          "items-center": variant === "compact",
        })}
      >
        <TextArea
          name="comment"
          className="h-auto w-full resize-y rounded-[12px] border-none text-black outline-none dark:text-white"
          value={content}
          rows={variant === "base" ? 2 : 1}
          autosize={autosize}
          showBorder={false}
          size={variant === "base" ? "md" : "sm"}
          disabled={isLoading || isUserLoading || !isAuthenticated}
          onChange={(e) => setContent(e.target.value)}
          onSubmit={onSubmitComment}
          placeholder={placeholder}
          autoFocus={autofocus}
        />
        <button
          disabled={isLoading}
          className={cx(
            "dark:hover:bg-d-neutral-500 dark:border-d-neutral-200 dark:disabled:bg-d-neutral-500 rounded-xl border border-neutral-400 text-black duration-150 hover:bg-neutral-400 disabled:bg-neutral-100 disabled:text-neutral-500 dark:text-white",
            {
              "px-4 py-2": variant === "base",
              "px-3 py-1.5 text-sm": variant === "compact",
            }
          )}
          onClick={onSubmitComment}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default AddComment;

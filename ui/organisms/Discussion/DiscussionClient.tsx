"use client";

import classNames from "classnames";
import { IScope } from "database/types";
import { useRef } from "react";
import { Skeleton } from "../../atoms";
import SvgMessageClock from "../../pixel-icons/MessageClock";
import AddComment from "./AddComment";
import Comments from "./Comments";
import { useComments } from "./useComments";

interface Props {
  scope: IScope;
  variant?: "base" | "compact";
  formPosition?: "top" | "bottom";
  autofocus?: boolean;
}

export const DiscussionClient = (props: Props) => {
  const { scope, variant = "base", formPosition = "top", autofocus } = props;
  const { comments, isLoading } = useComments(scope);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={classNames("rounded-xl bg-black/5 py-1 dark:bg-black/30", {
          "mb-6": formPosition === "top",
          "order-last mt-6": formPosition === "bottom",
        })}
      >
        <AddComment
          scope={scope}
          variant={variant}
          onSuccess={() => {
            ref.current?.scrollTo({ top: 0, behavior: "smooth" });
          }}
          isServerSide={false}
          autofocus={autofocus}
        />
      </div>

      {comments?.length > 0 && (
        <div className="hide-scrollbar max-h-full overflow-y-auto" ref={ref}>
          <Comments comments={comments} variant={variant} isServerSide={false} />
        </div>
      )}

      {comments?.length === 0 && !isLoading && (
        <div className="mt-8 flex flex-col items-center justify-center">
          <SvgMessageClock className="h-8 w-8 text-slate-500 dark:text-white/30" />
          <div className="mt-2.5 text-xs font-medium text-slate-700 dark:text-white/40">
            No comments so far...
          </div>
        </div>
      )}

      {isLoading && <Skeleton count={3} height={72} className="my-2" rounded />}
    </>
  );
};

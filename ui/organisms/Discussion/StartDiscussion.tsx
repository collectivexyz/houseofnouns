"use client";

import { useUser } from "libs/hooks/useUser";
import { Scope } from "prisma-social";
import { Skeleton } from "../../atoms";
import { AddComment } from "./AddComment";

type Props = {
  scope: Scope;
  variant?: "base" | "compact";
};

export const StartDiscussion = (props: Props) => {
  const { scope, variant } = props;
  const { login, isAuthenticated, isLoading } = useUser();

  if (isLoading) return <Skeleton height={24} rounded />;

  if (!isAuthenticated) {
    return (
      <div className="font-light dark:text-white">
        Please{" "}
        <button className="inline-block underline" onClick={() => login()}>
          sign in
        </button>{" "}
        to discuss.
      </div>
    );
  }

  return <AddComment scope={scope} variant={variant} />;
};

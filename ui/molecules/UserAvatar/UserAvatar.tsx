"use client";

import { useUser } from "libs/hooks/useUser";
import { ComponentProps, useId } from "react";
import { Avatar } from "../../atoms";

type Props = Omit<ComponentProps<typeof Avatar>, "id" | "name" | "imageUrl">;

export const UserAvatar = (props: Props) => {
  const { user, isLoading } = useUser();
  const id = useId();

  if (isLoading) return null;

  if (!user) return <Avatar id={id} {...props} />;

  return (
    <Avatar
      id={user.userId || ""}
      name={user.username || ""}
      imageUrl={user.avatarUrl || ""}
      {...props}
    />
  );
};

export default UserAvatar;

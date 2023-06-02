"use client";

/* eslint-disable @next/next/no-img-element */
import BoringAvatar from "boring-avatars";
import classNames from "classnames";
import { canUseNextImage } from "libs/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  imageUrl?: string | null;
  size?: number | `${number}`;
  name?: string;
  borderRadius?: "full" | "xl" | "lg" | "md" | "none";
  className?: string;
}

export const Avatar = (props: Props) => {
  const { id, name, size = 32, borderRadius = "full", className = "" } = props;
  const [imageUrl, setImageUrl] = useState<string | null>(props.imageUrl || null);

  useEffect(() => {
    if (props.imageUrl) setImageUrl(props.imageUrl || null);
  }, [props.imageUrl]);

  const borderRadiusClass = classNames({
    "rounded-full": borderRadius === "full",
    "rounded-md": borderRadius === "md",
    "rounded-lg": borderRadius === "lg",
    "rounded-xl": borderRadius === "xl",
    "rounded-none": borderRadius === "none",
  });

  return (
    <div
      className={classNames(
        "dark:bg-d-neutral-400 isolate max-h-full max-w-full shrink-0 overflow-hidden bg-neutral-100",
        borderRadiusClass,
        className
      )}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={name || " "}
          className={`${borderRadiusClass} h-full w-full object-cover`}
          width={size}
          height={size}
          onError={() => setImageUrl(null)}
          unoptimized={!canUseNextImage(imageUrl)}
        />
      )}

      {!imageUrl && (
        <BoringAvatar
          size={size}
          name={id || name || ""}
          variant="marble"
          colors={["#FF8B59", "#FE5A5A", "#FFE2D5", "#DBDBE3", "#C20D90"]}
          square
        />
      )}
    </div>
  );
};

export default Avatar;

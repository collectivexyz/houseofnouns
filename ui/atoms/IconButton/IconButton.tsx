"use client";

import { forwardRef, ButtonHTMLAttributes, Fragment } from "react";
import { Tooltip } from "../Tooltip";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { className = "", title, ...rest } = props;

  const Container = title ? Tooltip : Fragment;

  return (
    <Container {...(title ? { subtitle: title } : {})}>
      <button
        className={`dark:text-d-neutral-50 flex-shrink-0 select-none rounded-full p-1 text-neutral-300 hover:text-neutral-400 focus:outline-none dark:hover:text-white ${className}`}
        ref={ref}
        {...rest}
      />
    </Container>
  );
});

IconButton.displayName = "IconButton";

"use client";

import { IconButton } from "../../atoms/IconButton";
import ChevronLeft from "../../pixel-icons/ChevronLeft";

interface IProps {
  title: string;
  onLeftClick: () => void;
}

export const MobileHeader = (props: IProps) => {
  const { title, onLeftClick } = props;

  return (
    <div className="dark:border-d-neutral-400 flex w-full flex-shrink-0 items-center justify-between border-b border-neutral-100 px-2 py-4 md:hidden">
      <div className="w-5">
        <IconButton onClick={onLeftClick}>
          <ChevronLeft width="20" height="20" />
        </IconButton>
      </div>
      <h2 className="text-base font-semibold leading-none text-neutral-900 dark:text-white">
        {title}
      </h2>
      <div className="w-5" />
    </div>
  );
};

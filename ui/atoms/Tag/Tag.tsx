import classNames from "classnames";
import { MouseEventHandler, ReactNode } from "react";
import Close from "../../icons/Close";

interface Props {
  children: ReactNode;
  isDismissable?: boolean;
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
  size?: "xxs" | "xs" | "sm";
  variant?: "default" | "light" | "custom";
  className?: string;
}

export const Tag = (props: Props) => {
  const {
    children,
    isDismissable = false,
    onDismiss = () => undefined,
    size = "sm",
    className = "",
    variant = className.includes("bg") ? "custom" : "default",
  } = props;

  const iconSize = size === "sm" ? 14 : 8;

  return (
    <div
      className={classNames(
        className,
        "inline-flex flex-shrink-0 select-none items-center space-x-2",
        {
          "dark:bg-d-neutral-500 bg-neutral-100": variant === "default",
          "dark:bg-d-neutral-800 bg-neutral-50": variant === "light",
          "rounded-md p-2 text-xs": size === "sm",
          "rounded-md px-2 py-1.5 text-xs": size === "xs",
          "rounded-xs px-2 py-[5px] text-[10px]": size === "xxs",
        }
      )}
    >
      <span className="max-w-[200px] truncate font-normal leading-none text-neutral-900 dark:text-white">
        {children}
      </span>
      {isDismissable && (
        <button
          className="dark:text-d-neutral-100 text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
          onClick={onDismiss}
        >
          <Close width={iconSize} height={iconSize} />
        </button>
      )}
    </div>
  );
};

"use client";
/* eslint-disable react/display-name */

import { Menu } from "@headlessui/react";
import classNames from "classnames";
import { useRect } from "libs/hooks/useRect";
import { PropsWithChildren, ReactNode, useMemo } from "react";

export const Dropdown = (props: PropsWithChildren<{ className?: string }>) => {
  const { className = "", ...rest } = props;
  return <Menu as="div" className={`relative ${className}`} {...rest} />;
};

type DropdownButtonProps<C extends React.ElementType = "button"> = {
  as?: C;
} & React.ComponentPropsWithoutRef<C>;

const DropdownButton = ({ className = "", ...props }: DropdownButtonProps) => (
  <Menu.Button className={`flex ${className}`} {...props} />
);
Dropdown.Button = DropdownButton;

export interface DropdownItemsProps {
  children: ReactNode;
  className?: string;
  positionX?: "left" | "right";
  positionY?: "top" | "bottom";
}

const DropdownItems = (props: DropdownItemsProps) => {
  const { children, positionY = "bottom", className, positionX } = props;
  const [rect, ref] = useRect();

  const autoPositionX = useMemo(() => (rect && rect.left <= rect.width ? "left" : "right"), [rect]);

  const computedPositionX = positionX || autoPositionX;

  return (
    <div ref={ref}>
      <Menu.Items
        className={classNames(
          "dark:bg-d-neutral-700 absolute z-50 mt-2 min-w-[200px] overflow-hidden rounded-lg bg-white p-[5px] shadow-lg outline-none",
          {
            "mt-2": positionY === "bottom",
            "bottom-full mb-2": positionY === "top",
          },
          className
        )}
        style={{ [computedPositionX]: 0 }}
      >
        {children}
      </Menu.Items>
    </div>
  );
};

Dropdown.Items = DropdownItems;

interface ItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: any;
  disabled?: boolean;
}

Dropdown.Item = (props: ItemProps) => {
  const { onClick, icon: Icon, children, disabled } = props;
  return (
    <Menu.Item disabled={disabled}>
      {({ active }: { active: boolean }) => (
        <button
          onClick={onClick}
          className={classNames(
            "flex w-full items-center space-x-2 rounded-lg px-2.5 py-3 text-left text-sm",
            {
              "dark:text-d-neutral-100 text-neutral-900": !active,
              "dark:bg-d-neutral-900 bg-neutral-50 text-neutral-900 dark:text-white": active,
              "cursor-not-allowed": disabled,
            }
          )}
        >
          {Icon && (
            <Icon
              width="16"
              height="16"
              className={classNames("flex-shrink-0", {
                "dark:text-d-neutral-200 text-neutral-400": !active,
                "dark:text-d-neutral-100 text-neutral-900": active,
              })}
            />
          )}
          <span className="items-center md:whitespace-nowrap">{children}</span>
        </button>
      )}
    </Menu.Item>
  );
};

export default Dropdown;

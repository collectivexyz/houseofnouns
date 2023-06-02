"use client";

import Tippy from "@tippyjs/react/headless";
import { PropsWithChildren } from "react";
import { Placement } from "tippy.js";
import styles from "./Tooltip.module.css";

export interface TooltipProps {
  className?: string;
  title?: string | null;
  subtitle?: string | null;
  position?: Placement;
  interactive?: boolean;
}

export const Tooltip = (props: PropsWithChildren<TooltipProps>) => {
  const { children, title, subtitle, className = "", position = "top", interactive = true } = props;

  return (
    <Tippy
      appendTo="parent"
      interactive={interactive}
      placement={position}
      render={(attrs: any) => (
        <div
          className={`${styles.tooltip} dark:bg-d-neutral-900 bg-neutral-900`}
          tabIndex={-1}
          {...attrs}
        >
          {title && <div className="whitespace-pre-wrap text-sm font-semibold">{title}</div>}
          {subtitle && <div className="text-xs font-medium">{subtitle}</div>}
          <div data-popper-arrow className={`${styles.arrow} ${styles[attrs["data-placement"]]}`} />
        </div>
      )}
    >
      <div className={`inline-flex ${className}`}>{children}</div>
    </Tippy>
  );
};

export default Tooltip;

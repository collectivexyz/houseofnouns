import React, { HTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./Text.module.css";

// @REVIEW get the module/styling working

interface Props {
  as: React.ElementType<any>;
  className?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "caption" | "meta" | "info";
}

const VariantClasses: { [key: string]: string } = {
  info: "text-sm text-neutral-500 dark:text-d-neutral-50 mt-2 mb-2",
};

export const Text = (props: PropsWithChildren<Props & HTMLAttributes<any>>) => {
  const { as: Component, children, className = "", variant = Component as string, ...rest } = props;

  return (
    <Component
      className={classNames(styles[variant], VariantClasses[variant], className)}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Text;

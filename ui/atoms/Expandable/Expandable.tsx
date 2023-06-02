"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import cx from "classnames";

interface Props {
  isExpanded: boolean;
  children: ReactNode;
  duration?: number;
}

export const Expandable = (props: Props) => {
  const { isExpanded, children, duration = 0.25 } = props;
  return (
    <motion.div
      initial={isExpanded}
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={{
        collapsed: { height: 0, opacity: 0 },
        expanded: { height: "auto", opacity: 1 },
      }}
      transition={{ duration, ease: "linear" }}
      className={cx({ "overflow-hidden": !isExpanded })}
    >
      {children}
    </motion.div>
  );
};

export default Expandable;

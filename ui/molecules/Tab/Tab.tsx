"use client";

import { Tab as HeadlessTab } from "@headlessui/react";
import clx from "classnames";
import { motion } from "framer-motion";
import { Fragment, PropsWithChildren } from "react";

export const Tab = (props: any) => {
  const { children, onClick } = props;
  return (
    <HeadlessTab as={Fragment}>
      {({ selected }) => (
        <button
          className={clx(
            "select-none rounded-[20px] px-4 py-2 text-center font-bold tracking-tight text-black transition-all duration-200 dark:text-white md:py-4",
            {
              "bg-d-primary text-white dark:bg-white dark:text-black": selected,
              "hover:bg-d-primary hover:text-white": !selected,
            }
          )}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </HeadlessTab>
  );
};

const TabList = (props: PropsWithChildren<{ className?: string }>) => {
  const { className = "", ...rest } = props;
  return (
    <HeadlessTab.List
      {...rest}
      className={`grid auto-cols-fr grid-flow-col gap-1 rounded-[20px] border-4 border-white bg-white dark:border-black dark:bg-black ${className}`}
    />
  );
};

const TabPanel = (props: PropsWithChildren) => {
  return (
    <HeadlessTab.Panel
      {...props}
      as={motion.div}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{
        opacity: { duration: 0.2 },
        y: { duration: 0.4 },
      }}
    />
  );
};

const TabGroup = (props: PropsWithChildren) => {
  return <HeadlessTab.Group {...props} />;
};

const TabPanels = (props: PropsWithChildren<{ className: string }>) => {
  return <HeadlessTab.Panels {...props} />;
};

Tab.List = TabList;
Tab.Group = TabGroup;
Tab.Panels = TabPanels;
Tab.Panel = TabPanel;

export default Tab;

"use client";

import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { DrawerTitle } from "./DrawerTitle";
import clx from "classnames";

interface Props {
  children: ReactNode;
  closeDrawer: () => void;
  isOpen: boolean;
  title?: ReactNode;
  width?: string;
  actions?: ReactNode;
  variant?: "default" | "dark";
}

export const Drawer = (props: Props) => {
  const { title, width = "700px", isOpen, closeDrawer, actions, variant = "default" } = props;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={closeDrawer} static className="min-h-fill-available">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="dark:bg-d-neutral-900 fixed inset-0 z-50 bg-neutral-800 bg-opacity-[0.85] backdrop-blur-[10px] dark:bg-opacity-[0.85]"
            aria-hidden="true"
          />

          <Dialog.Panel
            as={motion.div}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={clx(
              "fixed inset-y-0 right-0 z-[60] flex max-w-full flex-col text-black dark:text-white",
              {
                "dark:bg-d-neutral-800 bg-white": variant === "default",
                "bg-white backdrop-blur-xl dark:bg-gray-900/95": variant === "dark",
              }
            )}
            style={{ width }}
          >
            <DrawerTitle closeDrawer={closeDrawer} actions={actions}>
              {title}
            </DrawerTitle>

            <div className="hide-scrollbar flex-grow overflow-y-scroll px-4 pb-4 md:px-5 md:pb-5">
              {props.children}
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Drawer;

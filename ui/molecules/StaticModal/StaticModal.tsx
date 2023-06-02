"use client";

import { Dialog } from "@headlessui/react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, Fragment, MutableRefObject, ReactNode } from "react";
import Close from "../../pixel-icons/Close";
import { MobileHeader } from "../Modal/MobileHeader";

export type Props = {
  children: ReactNode;
  className?: string;
  title: string;
  closeModal: () => void;
  isOpen: boolean;
  width?: CSSProperties["width"];
  height?: "auto" | "fill";
  minHeight?: CSSProperties["minHeight"];
  actions?: ReactNode;
  closeOnOverlayClick?: boolean;
  initialFocus?: MutableRefObject<HTMLElement | null> | undefined;
  showCloseButton?: boolean;
};

export const StaticModal = (props: Props) => {
  const {
    actions,
    title,
    isOpen,
    closeModal,
    children,
    width = "500px",
    height = "auto",
    className,
    initialFocus,
    closeOnOverlayClick = true,
    showCloseButton = false,
    minHeight,
  } = props;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[60] overflow-y-auto text-black dark:text-white"
          open={isOpen}
          onClose={closeModal}
          static
          initialFocus={initialFocus}
        >
          <div
            className={cx([
              "dark:bg-d-neutral-900 fixed inset-0 bg-neutral-800 bg-opacity-[0.85] backdrop-blur-[10px] dark:bg-opacity-[0.85]",
              !closeOnOverlayClick && "pointer-events-none",
            ])}
            aria-hidden="true"
          />
          <div className="flex min-h-screen items-center justify-center">
            <Dialog.Panel
              className={cx(
                "dark:bg-d-neutral-800 relative flex h-screen w-full max-w-full flex-col bg-white md:mx-auto md:max-h-[90vh] md:rounded-lg",
                className,
                {
                  "md:h-auto": height === "auto",
                  "overflow-hidden": !showCloseButton,
                }
              )}
              style={{ width, minHeight }}
            >
              <Dialog.Title as={Fragment}>
                <MobileHeader title={title} onLeftClick={closeModal} />
              </Dialog.Title>
              <div className="hide-scrollbar flex grow flex-col overflow-y-scroll p-3 md:p-7">
                {children}
              </div>
              {actions && (
                <div className="flex flex-shrink-0 justify-end space-x-4 p-6 md:px-7">
                  {actions}
                </div>
              )}
              {showCloseButton && (
                <div
                  className="dark:text-d-neutral-50 absolute right-2 top-2 cursor-pointer p-2.5 text-neutral-600 hover:text-black focus:outline-none dark:hover:text-white"
                  onClick={closeModal}
                >
                  <Close className="h-6 w-6" />
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default StaticModal;

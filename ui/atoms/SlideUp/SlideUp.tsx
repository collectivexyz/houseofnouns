"use client";

import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { useScrollLock } from "libs/hooks/useScrollLock";
import { PropsWithChildren, useCallback, useEffect } from "react";

export interface Props {
  isOpen: boolean;
  close: () => void;
  className?: string;
}

export const SlideUp = (props: PropsWithChildren<Props>) => {
  const { children, isOpen, close, className = "" } = props;
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    if (isOpen) lockScroll();
  }, [isOpen, lockScroll]);

  const onClose = useCallback(() => {
    unlockScroll();
    close();
  }, [close, unlockScroll]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-20 bg-neutral-800/40 backdrop-blur dark:bg-black/40"
            onClick={() => onClose()}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-xl bg-white backdrop-blur-xl dark:bg-black/80"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2, type: "spring", stiffness: 200, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.8 }}
            onDragEnd={(_: any, info: PanInfo) => {
              if (info.offset.y > 180) onClose();
            }}
          >
            <button className="my-2 flex w-full select-none justify-center py-2 focus:outline-none">
              <div className="bg-d-neutral-100 h-[3px] w-[74px] rounded dark:bg-white/50" />
            </button>
            <div className={className}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SlideUp;

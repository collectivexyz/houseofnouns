"use client";

import React from "react";
import { useIsiOS } from "./useIsScreenSize";
import useLayoutEffect from "./useLayoutEffect";

export const useScrollLock = () => {
  const scrollOffset = React.useRef(0);
  const isiOS = useIsiOS();

  const lockScroll = React.useCallback(() => {
    document.body.dataset.scrollLock = "true";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "var(--scrollbar-compensation)";

    if (isiOS) {
      scrollOffset.current = window.pageYOffset;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollOffset.current}px`;
      document.body.style.width = "100%";
    }
  }, [isiOS]);

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    if (isiOS) {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollOffset.current);
    }

    delete document.body.dataset.scrollLock;
  }, [isiOS]);

  useLayoutEffect(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.setProperty(
      "--scrollbar-compensation",
      `${scrollBarCompensation}px`
    );
  }, []);

  return {
    lockScroll,
    unlockScroll,
    isLocked: () => document.body.dataset.scrollLock === "true",
  };
};

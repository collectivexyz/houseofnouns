"use client";

import { useIsDesktop } from "libs/hooks/useIsScreenSize";
import { PropsWithChildren } from "react";
import { Markdown } from "ui/atoms";
import { Collapsable } from "ui/molecules";
import styles from "./ProposalContent.module.css";

export const ProposalContent = (props: PropsWithChildren) => {
  const { children } = props;

  const isDesktop = useIsDesktop();

  return (
    <Collapsable isEnabled={isDesktop} collapsedHeight="40vh" className="rounded-b-[20px]">
      <div className="rounded-b-5 p-4 pt-0 lg:p-6 lg:pt-0">
        <div className={`prose prose-a:text-d-primary prose-neutral ${styles.content}`}>
          <Markdown>{children.toString()}</Markdown>
        </div>
      </div>
    </Collapsable>
  );
};

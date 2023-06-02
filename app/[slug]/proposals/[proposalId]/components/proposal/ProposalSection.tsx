"use client";

import clsx from "classnames";
import { useLocalStorage } from "libs/hooks/useLocalStorage";
import { PropsWithChildren } from "react";
import { Expandable, Text } from "ui/atoms";
import ChevronRight from "ui/pixel-icons/ChevronRight";

interface Props {
  title: string;
  id: string;
  className?: string;
  isExpandible?: boolean;
}

export const ProposalSection = (props: PropsWithChildren<Props>) => {
  const { title, children, className, isExpandible = true, id } = props;
  const [isExpanded, setIsExpanded] = useLocalStorage(`proposal_section_${id}`, true);

  return (
    <div className={clsx("rounded-[20px] bg-white p-4 lg:px-8 lg:py-6", className)} id={id}>
      {isExpandible ? (
        <>
          <button
            className="group flex w-full items-center justify-between space-x-4 outline-none"
            onClick={() => setIsExpanded(c => !c)}
          >
            <Text as="h2">{title}</Text>
            <ChevronRight
              className={clsx("h-6 w-6 duration-150 group-hover:opacity-50", {
                "rotate-90": isExpanded,
              })}
            />
          </button>
          <Expandable isExpanded={isExpanded} duration={0.3}>
            <div className="pt-8">{children}</div>
          </Expandable>
        </>
      ) : (
        children
      )}
    </div>
  );
};

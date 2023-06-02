"use client";

import cx from "classnames";
import { useScrollPosition } from "libs/hooks/useScrollPosition";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { HorizontalMenu } from "ui/atoms";
import ArrowLeft from "ui/pixel-icons/ArrowLeft";

const items = [
  { name: "Proposal", slug: "proposal" },
  { name: "Discussion", slug: "discussion" },
  { name: "Voting", slug: "voting" },
] as const;

export type IProposalTab = (typeof items)[number]["slug"];

interface Props {
  slug: string;
  governanceType: string;
}

export const ProposalMobileMenu = (props: Props) => {
  const { governanceType, slug } = props;
  const pathname = usePathname();
  const { scrollPosition } = useScrollPosition();
  const [activeTab, setActiveTab] = useState<IProposalTab>("proposal");
  const router = useRouter();
  const [_, startTransition] = useTransition();

  const changeTab = (tab: IProposalTab) => {
    setActiveTab(tab);
    startTransition(() => {
      router.replace(pathname + "?tab=" + tab);
    });
  };

  return (
    <div
      className={cx("sticky top-0 z-40 block bg-white p-4 lg:hidden", {
        "shadow-smooth-lg": scrollPosition > 64,
      })}
    >
      <div className="flex flex-row items-center">
        <Link href={`/${slug}/${governanceType}`}>
          <ArrowLeft width="16" height="16" className="mr-2.5" />
        </Link>
        <HorizontalMenu size="lg">
          {items.map(item => (
            <HorizontalMenu.Item
              isActive={activeTab === item.slug}
              key={`sm_${item.slug}`}
              onClick={() => changeTab(item.slug)}
            >
              {item.name}
            </HorizontalMenu.Item>
          ))}
        </HorizontalMenu>
      </div>
    </div>
  );
};

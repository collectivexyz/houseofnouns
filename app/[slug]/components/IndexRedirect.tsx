"use client";

import { useIsDesktop } from "libs/hooks/useIsScreenSize";
import useBrowserLayoutEffect from "libs/hooks/useLayoutEffect";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  recentProposalId: string;
}

export default function IndexRedirect(props: Props) {
  const { recentProposalId } = props;
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const pathname = usePathname();

  useBrowserLayoutEffect(() => {
    if (pathname.includes("proposals")) return;
    if (!recentProposalId) return;
    const redirectPath = `${pathname}/proposals` + (isDesktop ? `/${recentProposalId}` : "");
    router.push(redirectPath);
  }, []);

  if (!recentProposalId) {
    return <div className="p-4">There are no proposals yet for this DAO.</div>;
  } else {
    return <></>;
  }
}

"use client";

import clsx from "classnames";
import { IProposal } from "database/types";
import { useSelectedLayoutSegment } from "next/navigation";
import { ProposalsList } from "./ProposalsList";

interface Props {
  proposals: IProposal[];
}

export default function ProposalsColumn(props: Props) {
  const { proposals } = props;
  const proposalId = useSelectedLayoutSegment();

  return (
    <div
      className={clsx("lg:h-body flex h-full flex-col bg-white p-4", {
        "max-lg:hidden": !!proposalId,
      })}
    >
      <h2 className="mb-3.5 text-2xl font-semibold">Proposals</h2>

      <ProposalsList proposals={proposals} />
    </div>
  );
}

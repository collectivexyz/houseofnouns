"use client";

import { Tab } from "ui/molecules";
import { useSetUrlState, useUrlState } from "libs/hooks/useUrlState";
import { calculateProposalDate } from "utils/calculateProposalDate";
import { timeUntil } from "libs/utils/numbers";
import { formatDuration } from "date-fns";
import Image from "next/image";
import { IProposal } from "database/types";
import { useState } from "react";
import { Text } from "ui/atoms";
import Clock from "ui/pixel-icons/Clock";
import Link from "next/link";

export function TodoTabs({
  todos,
  completed,
  upcoming,
  blockNumber,
}: {
  todos: IProposal[];
  completed: IProposal[];
  upcoming: IProposal[];
  blockNumber: number;
}) {
  const feeds = {
    Active: todos,
    Upcoming: upcoming,
  };
  const [tab, setTab] = useState(Object.keys(feeds)?.[0]);

  return (
    <div className="flex flex-col gap-2">
      <Tab.Group>
        <Tab.List className="w-full">
          {Object.keys(feeds).map(t => {
            return (
              <Tab onClick={() => setTab(t)} selected={tab === t}>
                {t}
              </Tab>
            );
          })}
        </Tab.List>
      </Tab.Group>
      {feeds[tab]?.map(proposal => {
        const startDate = calculateProposalDate(blockNumber, proposal.metadata.startBlock);

        const endDate = calculateProposalDate(blockNumber, proposal.metadata.endBlock);

        const startDateUntil = timeUntil(startDate);

        const endDateUntil = timeUntil(endDate);

        const endDateUntilString =
          "Ends in " +
          (endDateUntil.days > 1
            ? endDateUntil.days + " days"
            : endDateUntil.hours > 1
            ? endDateUntil.hours + " hrs"
            : endDateUntil.minutes + " min");

        const startDateUntilString =
          "Starts in " +
          (startDateUntil.days > 1
            ? startDateUntil.days + " days"
            : startDateUntil.hours > 1
            ? startDateUntil.hours + " hrs"
            : startDateUntil.minutes + " min");

        return (
          <Link href={`/entity/${proposal.entityId}/${proposal.proposalId}`} target="_blank">
            <div className="shadow-smooth-lg  w-full max-w-[640px] rounded-xl bg-white p-4">
              <span className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
                <Text as="h3" className="flex flex-row gap-2">
                  <span className="text-light-gray">{proposal.proposalId.substring(0, 4)}</span>
                  {proposal.title}
                </Text>
                {startDateUntil.days < 1000 && (
                  <span className="text-light-gray flex flex-row items-center gap-1 whitespace-nowrap">
                    {<Clock className="h-4 w-4" />}
                    {proposal?.status == "active" ? endDateUntilString : startDateUntilString}
                  </span>
                )}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

"use client";

import { Dropdown } from "ui/atoms/Dropdown/Dropdown";
import ArrowsVertical from "ui/pixel-icons/ArrowsVertical";

export const PROPOSAL_SORT_OPTIONS = [
  {
    label: "Newest",
    value: "creation.date",
    sortDirection: -1,
    mapFunc: x => new Date(x),
  },
  {
    label: "Oldest",
    value: "creation.date",
    sortDirection: 1,
    mapFunc: x => new Date(x),
  },
  {
    label: "Most favored",
    value: "options.1.voteCount",
    sortDirection: -1,
  },
  {
    label: "Highest Budget",
    value: "payoutAmount.eth",
    sortDirection: -1,
  },
];

export const ProposalsSorter = ({ sort, setSorting }) => {
  return (
    <Dropdown className="text-sm">
      <Dropdown.Button>
        <span className="flex flex-row items-center">
          {sort} <ArrowsVertical width="16" height="16" className="ml-1" />
        </span>
      </Dropdown.Button>
      <Dropdown.Items>
        {PROPOSAL_SORT_OPTIONS.map(option => (
          <Dropdown.Item key={option.label} onClick={() => setSorting(option.label)}>
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Items>
    </Dropdown>
  );
};

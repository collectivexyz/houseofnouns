"use client";

import { StatusIcons } from "components";
import { Dropdown } from "ui/atoms/Dropdown/Dropdown";
import ChevronDown from "ui/pixel-icons/ChevronDown";

export enum ProposalStatus {
  ACTIVE = "active",
  EXECUTED = "executed",
  CANCELLED = "cancelled",
  DEFEATED = "defeated",
  QUEUED = "queued",
  PENDING = "pending",
  CLOSED = "closed",
  SUCCEEDED = "succeeded",
}

export const PROPOSAL_FILTER_OPTIONS = [
  {
    label: "All",
    value: "",
  },
  ...Object.values(ProposalStatus).map(status => ({
    label: status.charAt(0).toUpperCase() + status.slice(1),
    value: status,
  })),
];

const renderStatusIcon = (status: ProposalStatus) => {
  const StatusIcon = StatusIcons[status];
  if (StatusIcon) {
    return <StatusIcon width="16" height="16" className="mr-1" />;
  }

  return <></>;
};

interface Props {
  status: string;
  setStatus: (status: ProposalStatus) => void;
}

export const ProposalsFilter = (props: Props) => {
  const { status, setStatus } = props;
  return (
    <Dropdown className="text-sm">
      <Dropdown.Button>
        <span className="flex flex-row items-center">
          {status?.charAt(0).toUpperCase() + status?.slice(1) || "All"}{" "}
          <ChevronDown width="16" height="16" className="ml-1" />
        </span>
      </Dropdown.Button>
      <Dropdown.Items>
        {PROPOSAL_FILTER_OPTIONS.map(option => {
          return (
            <Dropdown.Item
              key={option.label}
              onClick={() => setStatus(option.value as ProposalStatus)}
            >
              <span className="flex flex-row items-center">
                {renderStatusIcon(option.value as ProposalStatus)}
                {option.label}
              </span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Items>
    </Dropdown>
  );
};

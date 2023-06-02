"use client";

import { StatusIcons } from "components/StatusBadge";
import { SupportFilter } from "types/governance/config";
import { Dropdown } from "ui/atoms/Dropdown/Dropdown";
import ChevronDown from "ui/pixel-icons/ChevronDown";

export const SUPPORT_FILTER_OPTIONS = [
  ...Object.values(SupportFilter).map(status => ({
    label: status.charAt(0).toUpperCase() + status.slice(1),
    value: status,
  })),
];

const renderStatusIcon = (status: SupportFilter) => {
  const StatusIcon = StatusIcons[status];
  if (StatusIcon) {
    return <StatusIcon width="16" height="16" className="mr-1" />;
  }

  return <></>;
};

export const ProposalSupportFilter = ({ type, setSupportFilter }) => {
  return (
    <Dropdown className="text-sm">
      <Dropdown.Button>
        <span className="flex flex-row items-center">
          {type} <ChevronDown width="16" height="16" className="ml-1" />
        </span>
      </Dropdown.Button>
      <Dropdown.Items>
        {SUPPORT_FILTER_OPTIONS.map(option => {
          return (
            <Dropdown.Item
              key={option.label}
              onClick={() => {
                setSupportFilter(option.value as SupportFilter);
              }}
            >
              <span className="flex flex-row items-center">
                {renderStatusIcon(option.value as SupportFilter)}
                {option.label}
              </span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Items>
    </Dropdown>
  );
};

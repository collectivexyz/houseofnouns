import classNames from "classnames";
import { SVGProps } from "react";
import Check from "ui/pixel-icons/Check";
import Close from "ui/pixel-icons/Close";
import Hourglass from "ui/pixel-icons/Hourglass";
import MailArrowRight from "ui/pixel-icons/MailArrowRight";
import TrendingUp from "ui/pixel-icons/TrendingUp";

interface Props {
  status: string;
  showStatusText?: boolean;
}

export const StatusIcons: { [status: string]: (props: SVGProps<SVGSVGElement>) => JSX.Element } = {
  active: TrendingUp,
  executed: Check,
  cancelled: Close,
  defeated: Close,
  pending: Hourglass,
  queued: MailArrowRight,
};

export const StatusBadge = ({ status, showStatusText = true }: Props) => {
  // @ts-ignore
  const StatusIcon = StatusIcons[status];

  return (
    <div
      className={classNames(
        "flex h-[28px] flex-row items-center rounded-[12px] px-2 text-xs text-white",
        {
          "bg-[#068940]": status === "active",
          "bg-[#0385EB]": status === "executed",
          "bg-[#FFB802]": status === "pending",
          "bg-[#807F7E]": status === "cancelled",
          "bg-[#D22209]": status === "defeated",
          "bg-[#2F80ED]": status === "queued",
        }
      )}
    >
      {StatusIcon && <StatusIcon width="14" height="14" />}
      {showStatusText && <span className="ml-1 capitalize">{status}</span>}
    </div>
  );
};

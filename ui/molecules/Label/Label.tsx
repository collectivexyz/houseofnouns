"use client";

import { ReactNode } from "react";
import { Tooltip } from "../../atoms";
import { ConditonalWrapper } from "../../utils/react/react";

interface Props {
  children: ReactNode;
  icon?: ReactNode;
  colors?: string;
  className?: string;
  tooltip?: string;
}

export const Label = (props: Props) => {
  const { children, icon, colors = "bg-neutral-50", className, tooltip } = props;

  return (
    <ConditonalWrapper
      condition={!!tooltip}
      wrapper={children => (
        <Tooltip title={tooltip} interactive={false}>
          {children}
        </Tooltip>
      )}
    >
      <span
        className={`inline-flex items-center whitespace-nowrap rounded-[40px] py-1 px-2 text-xs font-light uppercase ${colors} ${className}`}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </span>
    </ConditonalWrapper>
  );
};

export default Label;

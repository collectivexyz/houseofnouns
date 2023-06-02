"use client";

import { useIsMobile } from "libs/hooks/useIsScreenSize";
import pluralize from "pluralize";
import { Children, PropsWithChildren, useMemo } from "react";

interface Props {
  max?: number | { mobile: number; desktop: number };
}

export const StackedAvatars = (props: PropsWithChildren<Props>) => {
  const { children } = props;
  const isMobile = useIsMobile();

  const max = chooseMax(props.max, isMobile);

  const items = useMemo(() => Children.toArray(children), [children]);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-shrink-0 -space-x-2">
        {items.slice(0, max).map((item, i) => (
          <div
            key={(item as any).key || `stacked_${i}`}
            className="dark:ring-d-neutral-700 relative flex rounded-full ring-2 ring-orange-50"
          >
            {item}
          </div>
        ))}
      </div>
      {items.length > max && (
        <div className="flex-shrink-0 text-xs font-medium leading-5">
          +{items.length - max} {pluralize("other", items.length - max)}
        </div>
      )}
    </div>
  );
};

export default StackedAvatars;

function chooseMax(max: Props["max"] = 5, isMobile: boolean) {
  if (typeof max === "number") return max;
  if (typeof max === "object" && max.mobile && max.desktop)
    return isMobile ? max.mobile : max.desktop;
  return 5;
}

"use client";

import isBefore from "date-fns/isBefore";
import subSeconds from "date-fns/subSeconds";
import { timeSince, timeSinceShort } from "libs/utils/numbers";
import { useEffect, useState } from "react";

interface Props {
  date?: string | Date;
  variant?: "short" | "default";
  justNowThreshold?: number;
}

export const DateRelative = (props: Props) => {
  const { date: rawDate, variant = "default", justNowThreshold = 30 } = props;
  if (!rawDate) {
    return null;
  }
  const [isJustNow, setIsJustNow] = useState(false);
  const [relativeDiff, setRelativeDiff] = useState("");

  const date = rawDate instanceof Date ? rawDate : new Date(rawDate);

  useEffect(() => {
    setIsJustNow(isBefore(subSeconds(new Date(), justNowThreshold), date));
    setRelativeDiff(formatRelative(date));
  }, [justNowThreshold, date]);

  const fullDate = date.toLocaleString();
  const formatRelative = variant === "default" ? timeSince : timeSinceShort;

  return (
    <time dateTime={fullDate} title={fullDate} suppressHydrationWarning>
      {isJustNow ? "just now" : `${relativeDiff} ago`}
    </time>
  );
};

export default DateRelative;

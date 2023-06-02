"use client";

import { useState } from "react";

interface Props {
  text: string;
  maxLength?: number;
}

export const ExpandableText = (props: Props) => {
  const { text, maxLength = 240 } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength || isExpanded) {
    return <>{text}</>;
  }

  return (
    <>
      {text.substring(0, maxLength)}...
      <button
        type="button"
        className="inline-block font-semibold hover:underline"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        See more
      </button>
    </>
  );
};

export default ExpandableText;

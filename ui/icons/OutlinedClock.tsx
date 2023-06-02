import { SVGProps } from "react";

const OutlinedClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity="0.5" clipPath="url(#clip0_260_1898)">
      <path
        d="M7.5 1.51758C4.20117 1.51758 1.51758 4.20117 1.51758 7.5C1.51758 10.7988 4.20117 13.4824 7.5 13.4824C10.7988 13.4824 13.4824 10.7988 13.4824 7.5C13.4824 4.20117 10.7988 1.51758 7.5 1.51758ZM7.5 14.6777C3.54199 14.6777 0.322266 11.458 0.322266 7.5C0.322266 3.54199 3.54199 0.322266 7.5 0.322266C11.458 0.322266 14.6777 3.54199 14.6777 7.5C14.6777 11.458 11.458 14.6777 7.5 14.6777Z"
        fill="currentColor"
      />
      <path
        d="M10.0811 8.09766H7.5C7.16895 8.09766 6.90234 7.83105 6.90234 7.5V2.87695C6.90234 2.5459 7.16895 2.2793 7.5 2.2793C7.83105 2.2793 8.09766 2.5459 8.09766 2.87695V6.90234H10.0811C10.4121 6.90234 10.6787 7.16894 10.6787 7.5C10.6787 7.83105 10.4121 8.09766 10.0811 8.09766Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_260_1898">
        <rect width="15" height="15" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);

export default OutlinedClock;
import { SVGProps } from "react";

const SvgMailMultiple = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 2H4v16h20V2ZM6 16V4h16v12H6ZM2 7H0v15h19v-2H2V7Zm8-1H8v2h2v2h2v2h4v-2h2V8h2V6h-2v2h-2v2h-4V8h-2V6Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgMailMultiple;

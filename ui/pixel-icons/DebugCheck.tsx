import { SVGProps } from "react";

const SvgDebugCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 2H6v2h2v2H6v3H4V7H2v2h2v2h2v2H2v2h4v2H4v2H2v2h2v-2h2v3h6v-2H8V8h8v6h2v-3h2V9h2V7h-2v2h-2V6h-2V4h2V2h-2v2h-2v2h-4V4H8V2Zm6 9h-4v2h4v-2Zm-4 4h2v2h-2v-2Zm4 3h2v2h-2v-2Zm4 2v2h-2v-2h2Zm2-2h-2v2h2v-2Zm0 0v-2h2v2h-2Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgDebugCheck;

import { SVGProps } from "react";

const SvgDebugStop = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 2h2v2H6V2Zm10 2h-2v2h-4V4H8v2H6v3H4V7H2v2h2v2h2v2H2v2h4v2H4v2H2v2h2v-2h2v3h8v-2H8V8h8v6h2v-3h2V9h2V7h-2v2h-2V6h-2V4Zm0 0V2h2v2h-2Zm-6 7h4v2h-4v-2Zm4 4h-4v2h4v-2Zm8 1h-6v6h6v-6Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgDebugStop;

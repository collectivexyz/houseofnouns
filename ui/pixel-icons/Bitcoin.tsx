import { SVGProps } from "react";

const SvgBitcoin = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 3h2v2h2v2H9v4h8v2H9v4h8v2h-2v2h-2v-2h-2v2H9v-2H5v-2h2v-4H5v-2h2V7H5V5h4V3h2v2h2V3Zm4 14v-4h2v4h-2Zm0-6V7h2v4h-2Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgBitcoin;

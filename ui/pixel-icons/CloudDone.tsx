import { SVGProps } from "react";

const SvgCloudDone = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 4h-6v2H8v2H4v2H2v2H0v6h2v2h20v-2h2v-6h-2v-2h-2V8h-2V6h-2V4Zm0 2v2h2v4h4v6H2v-6h2v-2h4V8h2V6h6Zm-6 6H8v2h2v2h2v-2h2v-2h2v-2h-2v2h-2v2h-2v-2Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgCloudDone;

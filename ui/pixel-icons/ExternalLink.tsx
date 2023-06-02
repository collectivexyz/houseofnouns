import { SVGProps } from "react";

const SvgExternalLink = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 11V3h-8v2h4v2h-2v2h-2v2h-2v2H9v2h2v-2h2v-2h2V9h2V7h2v4h2ZM11 5H3v16h16v-8h-2v6H5V7h6V5Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgExternalLink;

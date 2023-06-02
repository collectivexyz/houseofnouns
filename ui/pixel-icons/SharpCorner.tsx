import { SVGProps } from "react";

const SvgSharpCorner = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 3h2v2H3V3Zm0 4h2v2H3V7Zm2 4H3v2h2v-2Zm-2 4h2v2H3v-2Zm2 4H3v2h2v-2Zm2 0h2v2H7v-2Zm6 0h-2v2h2v-2Zm2 0h2v2h-2v-2Zm6 0h-2v2h2v-2Zm-2-4h2v2h-2v-2Zm2-2V3H11v2h8v8h2ZM7 3h2v2H7V3Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgSharpCorner;

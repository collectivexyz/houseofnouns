import { SVGProps } from "react";

const SvgRadioSignal = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 2h2v2h-2V2Zm2 14V4h2v12h-2Zm0 0v2h-2v-2h2ZM1 4h2v12H1V4Zm2 12h2v2H3v-2ZM3 4h2V2H3v2Zm2 2h2v8H5V6Zm2 8h2v2H7v-2Zm0-8h2V4H7v2Zm10 0h2v8h-2V6Zm0 0h-2V4h2v2Zm0 8v2h-2v-2h2Zm-6-7h4v6h-2v9h-2v-9H9V7h2Zm0 4h2V9h-2v2Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgRadioSignal;

import { SVGProps } from "react";

const SvgEuro = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 4h10v2H9v3h7v2H9v2h7v2H9v3h10v2H7v-5H5v-2h2v-2H5V9h2V4h2Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgEuro;

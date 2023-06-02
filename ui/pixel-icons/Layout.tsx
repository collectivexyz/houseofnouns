import { SVGProps } from "react";

const SvgLayout = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 5h20v14H2V5Zm2 2v4h16V7H4Zm16 6H10v4h10v-4ZM8 17v-4H4v4h4Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgLayout;

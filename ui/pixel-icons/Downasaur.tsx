import { SVGProps } from "react";

const SvgDownasaur = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 4h14v2h2v6h-8v2h6v2h-4v2h-2v2H2V8h2V6h2V4Zm2 6h2V8H8v2Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgDownasaur;

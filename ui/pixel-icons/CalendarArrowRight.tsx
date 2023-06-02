import { SVGProps } from "react";

const SvgCalendarArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 2h-2v2H9V2H7v2H3v18h10v-2H5V10h14v2h2V4h-4V2ZM7 6h12v2H5V6h2Zm14 10h-2v-2h-2v-2h-2v2h2v2h-6v2h6v2h-2v2h2v-2h2v-2h2v-2Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgCalendarArrowRight;

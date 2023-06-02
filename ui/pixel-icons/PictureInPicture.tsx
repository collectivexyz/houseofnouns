import { SVGProps } from "react";

const SvgPictureInPicture = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 4h20v16H2V4Zm2 2v12h16V6H4Zm6 2h8v6h-8V8Zm2 2v2h4v-2h-4Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgPictureInPicture;

import { SVGProps } from "react";

const Svg4KBox = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 4H1v16h22V4H3Zm18 2v12H3V6h18ZM7 8H5v5h4v3h2V8H9v3H7V8Zm8 0h-2v8h2v-3h2v3h2v-3h-2v-2h2V8h-2v3h-2V8Z"
      fill="currentColor"
    />
  </svg>
);

export default Svg4KBox;

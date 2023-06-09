import { SVGProps } from "react";

const SvgVerified = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="#2F80ED"
    {...props}
  >
    <g clipPath="url(#Verified_svg__a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m15.769 6.59-1.437 1.407 1.437 1.407a.744.744 0 0 1-.334 1.26l-1.957.5.552 1.938a.757.757 0 0 1-.927.927l-1.938-.552-.5 1.958c-.135.568-.869.755-1.26.334L8 14.33 6.594 15.77c-.395.417-1.122.247-1.26-.334l-.5-1.958-1.937.552a.757.757 0 0 1-.927-.927l.552-1.938-1.958-.5a.744.744 0 0 1-.333-1.26l1.437-1.407L.231 6.591a.744.744 0 0 1 .333-1.26l1.958-.5-.552-1.938a.757.757 0 0 1 .927-.927l1.937.552.5-1.959c.134-.56.865-.75 1.26-.333L8 1.674 9.406.226c.399-.422 1.128-.22 1.26.333l.5 1.959 1.937-.552a.757.757 0 0 1 .927.927l-.552 1.938 1.957.5a.744.744 0 0 1 .334 1.26Zm-4.712-1.17.586.557a.282.282 0 0 1-.002.415l-4.484 4.19a.326.326 0 0 1-.44-.002l-2.36-2.24a.282.282 0 0 1 .002-.415l.59-.551a.326.326 0 0 1 .441.001l1.554 1.476 3.673-3.432a.326.326 0 0 1 .44.002Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="Verified_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgVerified;

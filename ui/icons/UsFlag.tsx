import { SVGProps } from "react";

const SvgUsFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#USFlag_svg__a)">
      <path d="M10 18.03a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" fill="#F0F0F0" />
      <path
        d="M9.652 10.03H18a8.01 8.01 0 0 0-.275-2.087H9.652v2.087ZM9.652 5.856h7.174a8.043 8.043 0 0 0-1.846-2.087H9.652v2.087ZM10 18.03c1.883 0 3.614-.651 4.98-1.74H5.02A7.966 7.966 0 0 0 10 18.03ZM3.174 14.203h13.652a7.953 7.953 0 0 0 .898-2.086H2.276c.2.744.505 1.445.898 2.086Z"
        fill="#D80027"
      />
      <path
        d="M5.706 3.279h.729l-.678.493.259.797-.678-.493-.678.493.223-.689a8.044 8.044 0 0 0-1.551 1.73h.233l-.431.313a7.984 7.984 0 0 0-.194.342l.206.634-.384-.28c-.096.203-.183.41-.262.622l.227.699h.838l-.678.492.26.798-.679-.493-.406.295c-.04.327-.062.66-.062.998h8v-8c-1.58 0-3.054.458-4.294 1.249Zm.31 5.95-.678-.492-.678.493.259-.798-.679-.492h.839l.259-.797.259.797h.838l-.678.492.259.798Zm-.26-3.127.26.797-.678-.493-.678.493.259-.797-.679-.493h.839l.259-.797.259.797h.838l-.678.493Zm3.13 3.128-.679-.493-.678.493.26-.798-.679-.492h.838l.26-.797.258.797h.838l-.678.492.26.798Zm-.26-3.128.26.797-.679-.493-.678.493.26-.797-.679-.493h.838l.26-.797.258.797h.838l-.678.493Zm0-2.33.26.797-.679-.493-.678.493.26-.797-.679-.493h.838l.26-.797.258.797h.838l-.678.493Z"
        fill="#0052B4"
      />
    </g>
    <path
      d="M10 16.53a6.5 6.5 0 0 1-6.5-6.5h-3a9.5 9.5 0 0 0 9.5 9.5v-3Zm6.5-6.5a6.5 6.5 0 0 1-6.5 6.5v3a9.5 9.5 0 0 0 9.5-9.5h-3ZM10 3.53a6.5 6.5 0 0 1 6.5 6.5h3A9.5 9.5 0 0 0 10 .53v3Zm0-3a9.5 9.5 0 0 0-9.5 9.5h3a6.5 6.5 0 0 1 6.5-6.5v-3Z"
      fill="#fff"
    />
    <defs>
      <clipPath id="USFlag_svg__a">
        <path d="M2 10.03a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgUsFlag;
import { SVGProps } from "react";

const SvgWalletConnect = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <radialGradient cx="0%" cy="50%" fx="0%" fy="50%" r="100%" id="WalletConnect_svg__a">
        <stop stopColor="#5D9DF6" offset="0%" />
        <stop stopColor="#006FFF" offset="100%" />
      </radialGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <rect fill="url(#WalletConnect_svg__a)" width={512} height={512} rx={256} />
      <path
        d="M169.21 184.531c47.933-46.93 125.648-46.93 173.58 0l5.77 5.648a5.92 5.92 0 0 1 0 8.498l-19.735 19.321a3.115 3.115 0 0 1-4.34 0l-7.938-7.773c-33.439-32.74-87.655-32.74-121.094 0l-8.502 8.324a3.115 3.115 0 0 1-4.34 0l-19.733-19.321a5.92 5.92 0 0 1 0-8.498l6.332-6.199Zm214.392 39.958 17.563 17.196a5.92 5.92 0 0 1 0 8.498l-79.193 77.539c-2.397 2.346-6.283 2.346-8.68 0l-56.207-55.032a1.558 1.558 0 0 0-2.17 0l-56.205 55.032c-2.397 2.346-6.283 2.346-8.68 0l-79.195-77.54a5.92 5.92 0 0 1 0-8.498l17.563-17.196c2.396-2.346 6.282-2.346 8.679 0l56.208 55.033c.599.586 1.57.586 2.17 0l56.205-55.033c2.396-2.346 6.282-2.346 8.679 0l56.208 55.033c.599.586 1.57.586 2.17 0l56.206-55.032c2.397-2.346 6.283-2.346 8.68 0Z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export default SvgWalletConnect;

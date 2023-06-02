import { SVGProps } from "react";

const SvgFlowLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 72 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g opacity={0.2} clipPath="url(#FlowLogo_svg__a)" fill="currentColor">
      <path d="M15.03 27.897a14 14 0 0 1 .104-28C22.86 0 29.186 6.327 29.082 14a14 14 0 0 1-14.051 13.897Zm1.816-16.23c-.052-1.556.466-2.022 2.073-2.022h3.993V5.6c-1.763 0-3.474-.103-5.185 0-1.711.104-5.133 2.282-4.978 6.067h-1.66a5.6 5.6 0 0 0-.673 11.148 5.496 5.496 0 0 0 6.274-4.563c.103-.843.155-1.691.155-2.54h3.993v-4.045h-3.992ZM55.371 10.162h.311c.83 0 1.867-.26 2.386.156.518.414.57 1.452.777 2.177.208.726.726 2.8 1.193 4.408.622-1.815 1.193-3.422 1.66-5.082.155-.466-.156-1.037-.26-1.659a18.311 18.311 0 0 1 2.385.052c.156 0 .415.363.467.57l1.97 5.445.208.622 1.763-6.689h2.903c-.518 1.711-.985 3.37-1.503 5.03-.519 1.659-.934 3.11-1.349 4.614-.103.415-.259.623-.725.57h-2.334L63.15 14.83c-.57 1.763-1.14 3.318-1.66 4.926a.724.724 0 0 1-.932.622c-.726-.052-1.66.207-2.126-.156-.467-.363-.519-1.296-.726-2.022a378.12 378.12 0 0 1-2.126-7.207 4.31 4.31 0 0 1-.208-.83ZM49.979 20.533a5.342 5.342 0 1 1 5.288-5.29 5.236 5.236 0 0 1-5.288 5.29Zm2.437-5.29a2.49 2.49 0 0 0-2.385-2.592 2.488 2.488 0 0 0-2.541 2.593 2.487 2.487 0 0 0 3.498 2.622 2.49 2.49 0 0 0 1.428-2.622ZM34.786 12.912h-1.4v-2.334h1.348c0-1.555.052-3.059 1.452-3.992 1.4-.934 2.126-.622 3.37-.519V8.66c-.57.104-1.244.104-1.71.467-.467.363-.26.83-.467 1.4h2.126v2.385h-1.919v7.363h-2.8v-7.363ZM43.653 20.325h-2.697V6.273h2.697v14.052Z" />
      <path d="M12.749 11.666h4.096v4.044h-4.148c0-1.348 0-2.696.052-4.044ZM12.697 15.711c.037.623.02 1.247-.052 1.867a1.4 1.4 0 0 1-1.451 1.192 1.504 1.504 0 0 1-.52-2.903c.67-.108 1.346-.16 2.023-.156Z" />
    </g>
    <defs>
      <clipPath id="FlowLogo_svg__a">
        <path fill="#fff" transform="translate(.875)" d="M0 0h70.519v28H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgFlowLogo;
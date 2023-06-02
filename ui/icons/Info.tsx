import { SVGProps } from "react";

const SvgInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8 1a7.001 7.001 0 1 0 .002 14.002A7.001 7.001 0 0 0 8 1Zm0 12.645A5.642 5.642 0 0 1 2.355 8 5.643 5.643 0 0 1 8 2.355 5.643 5.643 0 0 1 13.645 8 5.642 5.642 0 0 1 8 13.645Zm0-9.54a1.185 1.185 0 1 1 0 2.37 1.185 1.185 0 0 1 0-2.37Zm1.58 7.17a.339.339 0 0 1-.338.338H6.758a.339.339 0 0 1-.339-.339v-.677c0-.187.152-.339.34-.339h.338V8.452h-.339a.339.339 0 0 1-.339-.34v-.677c0-.187.152-.338.34-.338h1.806c.187 0 .338.151.338.338v2.823h.339c.187 0 .339.152.339.339v.677Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgInfo;

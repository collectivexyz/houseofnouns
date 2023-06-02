import { SVGProps } from "react";

const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m14.754 2.941-1.695-1.695A.848.848 0 0 0 12.457 1H8c-.957 0-1.75.793-1.75 1.75v7c0 .957.793 1.75 1.75 1.75h5.25c.957 0 1.75-.793 1.75-1.75V3.543a.848.848 0 0 0-.246-.602ZM13.688 9.75a.432.432 0 0 1-.438.438H8a.432.432 0 0 1-.438-.438v-7c0-.246.192-.438.438-.438h3.5v1.313c0 .492.383.875.875.875h1.313v5.25Zm-5.25 3.5a.432.432 0 0 1-.438.438H2.75a.432.432 0 0 1-.438-.438v-7c0-.246.192-.438.438-.438h2.625V4.5H2.75C1.793 4.5 1 5.293 1 6.25v7c0 .957.793 1.75 1.75 1.75H8c.957 0 1.75-.793 1.75-1.75v-.875H8.437v.875Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgCopy;

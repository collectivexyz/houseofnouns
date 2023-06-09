import { SVGProps } from "react";

const SvgBook = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M14.338 11.938c.359 0 .662-.301.662-.657V1.656A.668.668 0 0 0 14.338 1H3.206C1.993 1 1 1.984 1 3.188v9.624C1 14.017 1.993 15 3.206 15h11.132c.359 0 .662-.3.662-.656a.668.668 0 0 0-.662-.656h-.22v-1.75h.22Zm-1.544 1.75H3.206a.867.867 0 0 1-.882-.876c0-.492.386-.874.882-.874h9.588v1.75Zm.883-3.063H3.206c-.303 0-.607.055-.882.191V3.187c0-.492.386-.874.882-.874h10.47v8.312Zm-7.662-5.25h4.853c.358 0 .661-.3.661-.656a.668.668 0 0 0-.661-.657H6.015c-.359 0-.662.301-.662.657 0 .355.303.656.662.656Zm0 2.188h4.853c.358 0 .661-.301.661-.657a.668.668 0 0 0-.661-.656H6.015c-.359 0-.662.3-.662.656 0 .356.303.657.662.657Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgBook;

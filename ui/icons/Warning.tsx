import { SVGProps } from "react";

const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m6.91 6.597.183 3.063c.01.173.156.309.332.309h1.15a.336.336 0 0 0 .228-.09.326.326 0 0 0 .104-.22l.183-3.062a.33.33 0 0 0-.332-.347H7.242a.33.33 0 0 0-.332.347ZM9.167 11.5c0 .634-.523 1.148-1.167 1.148A1.158 1.158 0 0 1 6.833 11.5c0-.634.523-1.148 1.167-1.148s1.167.514 1.167 1.148Zm-.012-9.844c-.512-.874-1.797-.875-2.31 0L.18 13.032C-.332 13.905.309 15 1.335 15h13.33c1.024 0 1.668-1.094 1.155-1.968L9.155 1.656ZM1.478 13.44 7.856 2.56a.168.168 0 0 1 .288 0l6.379 10.882a.164.164 0 0 1-.145.246H1.622a.164.164 0 0 1-.144-.245Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgWarning;

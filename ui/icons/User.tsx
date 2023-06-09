import { SVGProps } from "react";

const SvgUser = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M9.395 9.313h-2.79c-2.597 0-4.73 2.132-4.73 4.73 0 .52.438.957.957.957h10.336c.52 0 .957-.438.957-.957 0-2.598-2.133-4.73-4.73-4.73Zm-6.18 4.374c.164-1.722 1.64-3.062 3.39-3.062h2.79c1.75 0 3.226 1.34 3.39 3.063h-9.57ZM8 8a3.49 3.49 0 0 0 3.5-3.5A3.49 3.49 0 0 0 8 1a3.49 3.49 0 0 0-3.5 3.5A3.49 3.49 0 0 0 8 8Zm0-5.688c1.203 0 2.188.985 2.188 2.188A2.194 2.194 0 0 1 8 6.688 2.194 2.194 0 0 1 5.812 4.5c0-1.203.985-2.188 2.188-2.188Z"
      fill={props.fill || "currentColor"}
    />
  </svg>
);

export default SvgUser;

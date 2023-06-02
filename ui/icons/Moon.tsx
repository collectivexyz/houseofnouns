import { SVGProps } from "react";

const SvgMoon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M25.11 14.844h-.079a7.977 7.977 0 0 1-1.328.117c-3.71 0-6.836-3.008-6.836-6.836a6.877 6.877 0 0 1 3.477-5.977c.312-.195.234-.664-.117-.742a11.115 11.115 0 0 0-1.602-.156c-4.375 0-7.969 3.203-8.633 7.383.04.039.078.078.078.156.156-.039.274-.039.43-.039.469 0 .898.078 1.328.273.352-2.578 2.11-4.648 4.492-5.507a8.677 8.677 0 0 0-1.328 4.609c0 3.867 2.54 7.188 6.055 8.32a7.355 7.355 0 0 1-2.422.43 6.814 6.814 0 0 1-5.04-2.227c-.39.508-.859.938-1.444 1.211 1.601 1.758 3.906 2.891 6.484 2.891a8.692 8.692 0 0 0 6.797-3.242c.195-.274 0-.664-.313-.664ZM13 12.5c0-1.367-1.133-2.5-2.5-2.5-.469 0-.898.117-1.29.352A3.077 3.077 0 0 0 6.126 7.5 3.106 3.106 0 0 0 3.078 10H3a2.518 2.518 0 0 0-2.5 2.5C.5 13.867 1.633 15 3 15h7.5c1.367 0 2.5-1.133 2.5-2.5Z"
      fill={props.fill || "currentColor"}
    />
  </svg>
);

export default SvgMoon;
import { SVGProps } from "react";

const SvgShoppingCart = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M5.275 11.886c-.632 0-1.166.535-1.166 1.166 0 .632.534 1.166 1.166 1.166.631 0 1.166-.534 1.166-1.166 0-.631-.534-1.166-1.166-1.166Zm6.995 0c-.631 0-1.165.535-1.165 1.166 0 .632.534 1.166 1.165 1.166.632 0 1.166-.534 1.166-1.166 0-.631-.534-1.166-1.166-1.166Zm2.575-9.011c-.17-.195-.389-.316-.632-.316H3.963l-.048-.291c-.073-.292-.292-.486-.583-.486H1.583A.591.591 0 0 0 1 2.365c0 .315.267.583.583.583h1.263l1.457 7.675c.073.292.292.486.583.486h7.967a.591.591 0 0 0 .583-.583.591.591 0 0 0-.583-.583h-7.48l-.22-1.166h7.725a.78.78 0 0 0 .753-.559l1.335-4.663a.753.753 0 0 0-.12-.68ZM12.586 7.61H4.935l-.753-3.886h9.521L12.587 7.61Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgShoppingCart;

import { SVGProps } from "react";

const SvgLayers = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m.813 5.187 6.593 2.72C7.594 7.968 7.813 8 8 8c.188 0 .406-.031.594-.125l6.594-2.688C15.688 5 16 4.531 16 4s-.313-1-.813-1.188L8.595.094a1.726 1.726 0 0 0-1.188.03L.813 2.813C.313 3 0 3.47 0 4c0 .531.313 1 .813 1.187ZM8.03 1.5 14.156 4 7.97 6.5 1.844 4 8.03 1.5Zm7.156 9.312a.723.723 0 0 0-.968.407.664.664 0 0 0 .094.718L7.968 14.5l-6.282-2.563a.664.664 0 0 0 .094-.718.723.723 0 0 0-.968-.407C.313 11 0 11.47 0 12c0 .531.313 1 .813 1.187l6.593 2.72c.188.062.407.093.594.093.188 0 .406-.031.594-.125l6.594-2.688C15.688 13 16 12.531 16 12s-.313-1-.813-1.188Zm0-4c-.374-.187-.812 0-.968.407a.664.664 0 0 0 .094.718L7.968 10.5 1.687 7.937a.664.664 0 0 0 .094-.718c-.156-.407-.593-.594-.968-.407C.313 7 0 7.47 0 8c0 .531.313 1 .813 1.187l6.593 2.72c.188.062.407.093.594.093.188 0 .406-.031.594-.125l6.594-2.688C15.688 9 16 8.531 16 8s-.313-1-.813-1.188Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgLayers;

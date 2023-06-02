import { SVGProps } from "react";

const SvgUpVote = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="currentColor"
      d="m4 14h2 2v3 4c0 .553.447 1 1 1h6c.553 0 1-.447 1-1v-5-2h1 3c.385 0 .734-.221.901-.566.166-.347.12-.758-.12-1.059l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10c-.24.301-.286.712-.12 1.059.167.345.516.566.901.566z"
    />
  </svg>
);

export default SvgUpVote;

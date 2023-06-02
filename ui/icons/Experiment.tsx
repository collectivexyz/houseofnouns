import { SVGProps } from "react";

const SvgExperiment = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
    <path
      fill="currentColor"
      d="M593.3 627s-46.6 59.5-106.2 0c-57.8-56-99.8 0-99.8 0l-139 274.2c-4 14.9 4.8 30.3 19.8 34.3h462.1c14.9-4 23.8-19.3 19.8-34.3L593.3 627zm213.1 260.2L582.9 511.1v-.7l-.4-220.4H598c23.1 0 42-18.8 42-42s-18.8-42-42-42H374c-23.2 0-42 18.8-42 42s18.8 42 42 42h13.5l-.4 220.5-193.5 376.7C181.6 932 208.2 978 253 990h494c44.9-12 71.4-58 59.4-102.8zm-66.8 74.7-479.2-.5c-29.8-8-47.5-38.7-39.5-68.5l194.6-381.4.5-249.5h-42c-7.7 0-14-6.3-14-14s6.3-14 14-14h224c7.7 0 13.9 6.3 13.9 14s-6.2 14-13.9 14h-42l.7 248.6 222.4 382.8c8 29.9-9.7 60.6-39.5 68.5zM513.4 164.1c0 15.5 12.5 28 28 28s28-12.5 28-28-12.5-28-28-28-28 12.5-28 28zM541.5 94c23.2 0 42-18.8 42-42s-18.8-42-42-42-42 18.8-42 42c-.1 23.2 18.8 42 42 42zm-112.1 70.1c15.5 0 28-12.5 28-28s-12.5-28-28-28-28 12.5-28 28c0 15.4 12.5 28 28 28z"
    />
  </svg>
);

export default SvgExperiment;

import { SVGProps } from "react";

const SvgHistoryChroma = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8 4c.416 0 .75.334.75.75v2.94l2.003 2.029c.319.293.319.769 0 1.034-.265.319-.74.319-1.034 0l-2.25-2.25A.642.642 0 0 1 7.25 8V4.75c0-.416.334-.75.75-.75Z"
      fill="#2F80ED"
    />
    <path
      opacity={0.4}
      d="M4.719 4.719C5.19 5.19 4.856 6 4.19 6H.75A.75.75 0 0 1 0 5.25V1.81a.75.75 0 0 1 1.28-.53l1.063 1.063A7.962 7.962 0 0 1 7.972 0C12.419 0 16 3.581 16 8c0 4.419-3.581 8-8.028 8a7.957 7.957 0 0 1-4.544-1.434c-.453-.344-.564-.941-.247-1.394a.998.998 0 0 1 1.39-.247A5.946 5.946 0 0 0 7.972 14C11.313 14 14 11.312 14 8c0-3.34-2.688-6-6.028-6-1.656 0-3.128.67-4.216 1.756l.963.963Z"
      fill="#2F80ED"
    />
  </svg>
);

export default SvgHistoryChroma;
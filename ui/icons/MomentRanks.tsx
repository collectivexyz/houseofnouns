import { SVGProps } from "react";

const SvgMomentRanks = (props: SVGProps<SVGSVGElement>) => (
  <svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    viewBox="0 0 144 144"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0h144v144H0z" fill="#231f20" />
    <g fill="#f1f2f2" fillRule="nonzero">
      <path d="M71.42 42.86v52.78l-8.75-6.86V61.41L45.03 75.13 27.46 61.41v27.37l-8.82 6.86V42.86l26.39 20.58zM126.79 95.57h-9.73l-11.62-21.42H85.98v-8.68h25.27c1.05-.07 2.03-.35 2.87-.84.77-.42 1.4-1.12 2.03-2.03s.91-2.24.91-3.99c0-1.68-.28-3.01-.91-3.92s-1.26-1.61-2.03-2.03c-.84-.49-1.82-.77-2.87-.84H85.98v-8.75h25.27c2.73.14 5.11.77 7.28 1.96.91.49 1.75 1.12 2.66 1.89s1.68 1.68 2.38 2.73c.63 1.05 1.19 2.31 1.61 3.78s.63 3.22.63 5.18c0 3.15-.49 5.74-1.54 7.77s-2.17 3.64-3.43 4.76c-1.33 1.19-2.52 1.96-3.64 2.38-1.19.42-1.89.63-2.1.63z" />
    </g>
  </svg>
);

export default SvgMomentRanks;

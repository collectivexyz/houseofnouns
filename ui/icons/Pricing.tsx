import { SVGProps } from "react";

const SvgPricing = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m12.562 6.308-4.66-4.66C7.55 1.266 6.9 1 6.37 1H1.445C.649 1 0 1.649 0 2.445v4.924C0 7.9.265 8.55.649 8.903l4.659 4.659c.413.442.973.649 1.533.649.56 0 1.12-.207 1.563-.649l4.158-4.158a2.19 2.19 0 0 0 0-3.096Zm-1.003 2.094-4.157 4.157a.733.733 0 0 1-1.092 0L1.651 7.9c-.118-.088-.236-.383-.236-.53V2.444l.03-.03h4.924c.148 0 .443.118.531.236l4.66 4.66c.324.294.324.766 0 1.09Zm-7.549-4.1a.718.718 0 0 1-.707.708.718.718 0 0 1-.708-.707c0-.384.324-.708.708-.708.383 0 .707.324.707.708ZM16.513 9.05l-4.688 4.689a1.624 1.624 0 0 1-1.18.472c-.295 0-.59-.089-.855-.236l5.455-5.426c.354-.383.354-.973 0-1.327L9.023 1h1.091c.384 0 .885.206 1.15.472l5.25 5.249c.648.619.648 1.68 0 2.33Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgPricing;
